import React, {useEffect, useRef} from "react";
import classes from "../../TradingView.module.css";
import * as LightweightCharts from "lightweight-charts";
import {useSelector} from "react-redux";
import moment from "moment-jalaali";
import {
    candleColors,
    darkTheme,
    lightTheme
} from "../../../../../../../../../../../../constants/chart";
import i18n from "i18next";
import {useGetChartCandlesticks} from "../../../../../../../../../../../../queries";
import {useTranslation} from "react-i18next";


const MarketChart = ({type}) => {

    const {t} = useTranslation();

    let chartProperties, candleSeries, volumeSeries;
    const chart = useRef();

    const theme = useSelector((state) => state.global.theme)
    const activePairSymbol = useSelector((state) => state.exchange.activePair.symbol)

    const {data, error} = useGetChartCandlesticks(activePairSymbol, type)
    const chartContainerRef = useRef();
    const resizeObserver = useRef();

    const timeScale = {
        tickMarkFormatter: (time) => {
            if (i18n.language === undefined || i18n.language === "fa") return moment(time * 1000).format("jYYYY/jM/jD")
            return moment(time * 1000).format("YYYY/M/D");
        },
    }

    const fontFamily = (i18n.language === undefined || i18n.language === "fa") ? "iranyekan" : "Segoe UI"
    chartProperties = {
        layout: {
            ...lightTheme.layout,
            fontFamily
        },
        crosshair: {
            vertLine: {
                visible: true,
                labelVisible: false,
            },
            horzLine: {
                visible: true,
                labelVisible: true,
            },
            mode: 1,
        },
        localization: {
            locale: (i18n.language === undefined || i18n.language === "fa") ? "fa-IR" : "en-US",
        },
        grid: lightTheme.grid,
        priceScale: lightTheme.priceScale,
        timeScale: {...lightTheme.timeScale, ...timeScale}
    };
    if (theme === "DARK") {
        chartProperties = {
            ...chartProperties,
            layout: {
                ...darkTheme.layout,
                fontFamily
            },
            grid: darkTheme.grid,
            priceScale: darkTheme.priceScale,
            timeScale: {...darkTheme.timeScale, ...timeScale},
        };
    }

    useEffect(() => {
        if (chart.current !== null) {
            chart.current = null;
        }

        chart.current = LightweightCharts.createChart(
            chartContainerRef.current,
            chartProperties,
        );

        candleSeries = chart.current.addCandlestickSeries(theme === "DARK" ? darkTheme : candleColors);
        volumeSeries = chart.current.addHistogramSeries({
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '',
            lastValueVisible: false,
        });
        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8,
                bottom: 0,
            },
        });

        candleSeries.setData(data);
        volumeSeries.setData(data);

        chart.current.timeScale().fitContent();

        return () => {
            if (chart.current !== null) {
                chart.current.remove();
                chart.current = null;
            }
        };
    }, [activePairSymbol, type, data]);

    useEffect(() => {
        i18n.on("languageChanged", (lng) => {
            if (chart.current !== null) {
                chart.current.applyOptions({
                    localization: {
                        locale: lng === "fa" ? "fa-IR" : "en-US",
                    },
                    layout: {
                        fontFamily: lng === "fa" ? "iranyekan" : "Segoe UI",
                    },
                });
            }
        });

        resizeObserver.current = new ResizeObserver((entries) => {
            const {width, height} = entries[0].contentRect;
            chart.current.applyOptions({width, height});
            setTimeout(() => {
                if (chart.current !== null) {
                    chart.current.timeScale().fitContent();
                }
            }, 0);
        });
        resizeObserver.current.observe(chartContainerRef.current);
        return () => resizeObserver.current.disconnect();

    }, [])

    useEffect(() => {
        if (theme === "DARK") {
            chart.current.applyOptions({
                ...chartProperties,
                layout: {
                    ...darkTheme.layout,
                },
                grid: darkTheme.grid,
                priceScale: darkTheme.priceScale,
                timeScale: darkTheme.timeScale,
            });
        } else {
            chart.current.applyOptions({
                ...chartProperties,
                layout: {
                    ...lightTheme.layout,
                },
                grid: lightTheme.grid,
                priceScale: lightTheme.priceScale,
                timeScale: lightTheme.timeScale,
            });
        }
    }, [theme]);

    return (
        <div ref={chartContainerRef} className={`width-100  ${classes.chartContainer}`}>
            <p className={classes.error}>{error && t('charts.noChartData')}</p>
        </div>
    );
};

export default MarketChart;