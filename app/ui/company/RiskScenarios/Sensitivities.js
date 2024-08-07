import { format2Decimal, format2DecimalSens, roundUpNumber, simpleFormat } from "@/app/lib/utils";
import { useState } from "react";

export default function Sensitivities({sensData}) {


    const [data, setData] = useState(sensData.filter(item => ['2024', '2025', '2026'].includes(item.year)));

    const dataType = [{
        key : 'be',
        title : 'D1 Lower',
    },
    {
        key : 'ce',
        title : 'D1 Central',
    },
    {
        key : 'bu',
        title : 'D1 Upper',
    }
    ]

    const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];

    return (<>
    <div className="row">

        <div className="col-12 col-sm-6">
            <h5 className="mb-3">D1 DPS Sensitivities</h5>
            {[4,5,6].map((z, i) => ( 
            <div className={`card flex-fill ${i !== 2 && 'mb-4'}`} key={i}>
                <div className="table-responsive">
                    <table className="table sens-table">
                        <thead>
                            <tr className="highlight">
                                <th className="bg-light-cream">FY2{z} {data[i]['year']}</th>
                                <th className="bg-light-cream">D1 Lower</th>
                                <th className="bg-light-cream">D1 Central</th>
                                <th className="bg-light-cream">D1 Upper</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sales (m)</td>
                                <td>{roundUpNumber(data[i]['be_sales_m_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_sales_m_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_sales_m_bu'])}</td>
                            </tr>
                            <tr>
                                <td>Sales v Central %</td>
                                <td>{simpleFormat(data[i]['be_sales_v_central_percent_be'])}</td>
                                <td>{simpleFormat(data[i]['ce_sales_v_central_percent_ce'])}</td>
                                <td>{simpleFormat(data[i]['bu_sales_v_central_percent_bu'])}</td>
                            </tr>
                            <tr>
                                <td>Net income (m)</td>
                                <td>{roundUpNumber(data[i]['be_net_income_m_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_net_income_m_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_net_income_m_bu'])}</td>
                            </tr>
                            <tr>
                                <td>NI margin (%)</td>
                                <td>{simpleFormat(data[i]['be_ni_margin_percent_be'])}</td>
                                <td>{simpleFormat(data[i]['ce_ni_margin_percent_ce'])}</td>
                                <td>{simpleFormat(data[i]['bu_ni_margin_percent_bu'])}</td>
                            </tr>
                            <tr>
                                <td>NI margin change (bp)</td>
                                <td>{roundUpNumber(data[i]['be_ni_margin_change_bp_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_ni_margin_change_bp_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_ni_margin_change_bp_bu'])}</td>
                            </tr>
                            <tr>
                                <td>AWSC (m)</td>
                                <td>{roundUpNumber(data[i]['be_awsc_m_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_awsc_m_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_awsc_m_bu'])}</td>
                            </tr>

                            <tr className="bold-row">
                                <td className="bg-light-cream">EPS</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['be_eps_be'])}</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['ce_eps_ce'])}</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['bu_eps_bu'])}</td>
                            </tr>
                            </tbody>
                            </table>
                            <table className="table sens-table mt-2">
                                <tbody>
                            <tr className="bold-row">
                                <td className="bg-light-cream">EPS v Central %</td>
                                <td className="bg-light-cream">{data[i]['be_eps_v_central_percent_be']}</td>
                                <td className="bg-light-cream">{data[i]['ce_eps_v_central_percent_ce']}</td>
                                <td className="bg-light-cream">{data[i]['bu_eps_v_buntral_percent_bu']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                
                <div className="table-responsive">
                    <table className="table sens-table">
                        <thead>
                            <tr>
                                <th className="bg-payout" colSpan={6}>Payout ratio (%; FX adj.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td className="bg-cream">{data[i]['dps_be1']}</td>
                                <td>{data[i]['dps_ce1']}</td>
                                <td>{data[i]['dps_be1']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_be2']}</td>
                                <td className="bg-cream">{data[i]['dps_ce2']}</td>
                                <td>{data[i]['dps_be2']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_be4']}</td>
                                <td className="bg-cream">{data[i]['dps_ce4']}</td>
                                <td>{data[i]['dps_be4']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_be4']}</td>
                                <td>{data[i]['dps_ce4']}</td>
                                <td>{data[i]['dps_be4']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_be5']}</td>
                                <td>{data[i]['dps_ce5']}</td>
                                <td className="bg-cream">{data[i]['dps_be5']}</td>
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
                                <td>{format2DecimalSens(line[`${type?.key}_q1`])}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_q2`])}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_q3`])}</td>
                                <td>{format2DecimalSens(line[`${type?.key}_q4`])}</td>
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