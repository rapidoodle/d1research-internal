import { format2Decimal, format2DecimalSens, roundUpNumber, simpleFormat } from "@/app/lib/utils";
import { useState } from "react";

export default function Sensitivities({sensData}) {

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Create an array with the current year and the next two years
    const yearsArray = [currentYear, currentYear + 1, currentYear + 2];
    const [data, setData] = useState(sensData.filter(item => yearsArray.includes(Number(item.year))).reverse());

    const dataType = [{
        key : 'lower',
        title : 'D1 Lower',
    },
    {
        key : 'central',
        title : 'D1 Central',
    },
    {
        key : 'upper',
        title : 'D1 Upper',
    }
    ]

    return (<>
    <div className="row">

        <div className="col-12 col-sm-6">
            <h5 className="mb-3">D1 DPS sensitivities</h5>
            {yearsArray.map((z, i) => ( 
            <div className={`card flex-fill ${i !== 2 && 'mb-4'}`} key={i}>
                <div className="table-responsive">
                <table className="table sens-table">
                    <thead>
                        <tr className="highlight">
                            <th className="bg-light-cream">FY2{z.toString().slice(-1)}</th>
                            <th className="bg-light-cream">D1 Lower</th>
                            <th className="bg-light-cream">D1 Central</th>
                            <th className="bg-light-cream">D1 Upper</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sales (m)</td>
                            <td>{roundUpNumber(data[i]['lower_sales_m'])}</td>
                            <td>{roundUpNumber(data[i]['central_sales_m'])}</td>
                            <td>{roundUpNumber(data[i]['upper_sales_m'])}</td>
                        </tr>
                        <tr>
                            <td>Sales v Central %</td>
                            <td>{simpleFormat(data[i]['lower_sales_v_central_pct'])}</td>
                            <td>{simpleFormat(data[i]['central_sales_v_central_pct'])}</td>
                            <td>{simpleFormat(data[i]['upper_sales_v_central_pct'])}</td>
                        </tr>
                        <tr>
                            <td>Net income (m)</td>
                            <td>{roundUpNumber(data[i]['lower_net_income_m'])}</td>
                            <td>{roundUpNumber(data[i]['central_net_income_m'])}</td>
                            <td>{roundUpNumber(data[i]['upper_net_income_m'])}</td>
                        </tr>
                        <tr>
                            <td>NI margin (%)</td>
                            <td>{simpleFormat(data[i]['lower_ni_margin_pct'])}</td>
                            <td>{simpleFormat(data[i]['central_ni_margin_pct'])}</td>
                            <td>{simpleFormat(data[i]['upper_ni_margin_pct'])}</td>
                        </tr>
                        <tr>
                            <td>NI margin change (bp)</td>
                            <td>{roundUpNumber(data[i]['lower_ni_margin_change_bp'])}</td>
                            <td>{roundUpNumber(data[i]['central_ni_margin_change_bp'])}</td>
                            <td>{roundUpNumber(data[i]['upper_ni_margin_change_bp'])}</td>
                        </tr>
                        <tr>
                            <td>AWSC (m)</td>
                            <td>{roundUpNumber(data[i]['lower_awsc_m'])}</td>
                            <td>{roundUpNumber(data[i]['central_awsc_m'])}</td>
                            <td>{roundUpNumber(data[i]['upper_awsc_m'])}</td>
                        </tr>
                        <tr>
                            <td>DPS</td>
                            <td>{format2Decimal(data[i]['lower_dps'])}</td>
                            <td>{format2Decimal(data[i]['central_dps'])}</td>
                            <td>{format2Decimal(data[i]['upper_dps'])}</td>
                        </tr>
                        <tr>
                            <td>Payout ratio</td>
                            <td>{simpleFormat(data[i]['lower_payout_ratio'])}</td>
                            <td>{simpleFormat(data[i]['central_payout_ratio'])}</td>
                            <td>{simpleFormat(data[i]['upper_payout_ratio'])}</td>
                        </tr>
                        <tr className="bold-row">
                            <td className="bg-light-cream">EPS</td>
                            <td className="bg-light-cream">{format2Decimal(data[i]['lower_eps'])}</td>
                            <td className="bg-light-cream">{format2Decimal(data[i]['central_eps'])}</td>
                            <td className="bg-light-cream">{format2Decimal(data[i]['upper_eps'])}</td>
                        </tr>
                        <tr className="spacer-row">
                            <td colSpan={4}></td>
                        </tr>
                        <tr className="bold-row">
                            <td className="bg-light-cream">EPS v Central %</td>
                            <td className="bg-light-cream">{data[i]['lower_eps_v_central_pct']}</td>
                            <td className="bg-light-cream">{data[i]['central_eps_v_central_pct']}</td>
                            <td className="bg-light-cream">{data[i]['upper_eps_v_central_pct']}</td>
                        </tr>
                        <tr className="spacer-row">
                            <td colSpan={4}></td>
                        </tr>
                        <tr className="bold-row">
                            <td className="bg-light-cream">DPS</td>
                            <td className="bg-light-cream">{format2Decimal(data[i]['lower_dps'])}</td>
                            <td className="bg-light-cream">{format2Decimal(data[i]['central_dps'])}</td>
                            <td className="bg-light-cream">{format2Decimal(data[i]['upper_dps'])}</td>
                        </tr>
                        <tr className="spacer-row">
                            <td colSpan={4}></td>
                        </tr>
                        <tr className="bold-row">
                            <td className="bg-light-cream">Payout ratio</td>
                            <td className="bg-light-cream">{simpleFormat(data[i]['lower_payout_ratio'])}</td>
                            <td className="bg-light-cream">{simpleFormat(data[i]['central_payout_ratio'])}</td>
                            <td className="bg-light-cream">{simpleFormat(data[i]['upper_payout_ratio'])}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        ))}

        </div>
        <div className="col-12 col-sm-6">
        <h5 className="mb-3">Payment timeline</h5>
        {dataType.map((type, dIndex) => {
            return ( 
            <div className={`card flex-fill ${dIndex !== 4 && 'mb-4'}`} key={dIndex}>
                <div className="table-responsive">
                    <table className="table timeline-table">
                        <thead>
                            <tr className="highlight">
                                <th className="bg-light-cream">{type.title}</th>
                                <th className="bg-light-cream">Q1</th>
                                <th className="bg-light-cream">Q2</th>
                                <th className="bg-light-cream">Q3</th>
                                <th className="bg-light-cream">Q4</th>
                                <th className="bg-light-cream">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sensData.map((line, yIndex) => ( 
                            <tr key={yIndex}>
                                <td>{line.year}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_q1_div`])}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_q2_div`])}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_q3_div`])}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_q4_div`])}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_total`])}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
)})}
        </div>
    </div>
    </>
    );
}