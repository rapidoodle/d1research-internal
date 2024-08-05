import { format2Decimal, format2DecimalSens, roundUpNumber, simpleFormat } from "@/app/lib/utils";
import { useState } from "react";

export default function Sensitivities({sensData}) {


    const [data, setData] = useState(sensData.filter(item => ['2024', '2025', '2026'].includes(item.year)));

    const dataType = [{
        key : 'vbe',
        title : 'Very Bear',
    },
    {
        key : 'be',
        title : 'Bear',
    },
    {
        key : 'ce',
        title : 'Central',
    },
    {
        key : 'bu',
        title : 'Bull',
    },
    {
        key : 'vbu',
        title : 'Very Bull',
    }
    ]

    const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];

    return (<>
    <div className="row">

        <div className="col-12 col-sm-7">
            <h5 className="mb-3">D1 DPS Sensitivities</h5>
            {[4,5,6].map((z, i) => ( 
            <div className={`card flex-fill ${i !== 2 && 'mb-4'}`} key={i}>
                <div className="table-responsive">
                    <table className="table sens-table">
                        <thead>
                            <tr className="highlight">
                                <th className="bg-light-cream">FY2{z} {data[i]['year']}</th>
                                <th className="bg-light-cream">V Bear</th>
                                <th className="bg-light-cream">Bear</th>
                                <th className="bg-light-cream">Central</th>
                                <th className="bg-light-cream">Bull</th>
                                <th className="bg-light-cream">V Bull</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sales (m)</td>
                                <td>{roundUpNumber(data[i]['vbe_sales_m_vbe'])}</td>
                                <td>{roundUpNumber(data[i]['be_sales_m_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_sales_m_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_sales_m_bu'])}</td>
                                <td>{roundUpNumber(data[i]['vbu_sales_m_vbu'])}</td>
                            </tr>
                            <tr>
                                <td>Sales v Central %</td>
                                <td>{simpleFormat(data[i]['vbe_sales_v_central_percent_vbe'])}</td>
                                <td>{simpleFormat(data[i]['be_sales_v_central_percent_be'])}</td>
                                <td>{simpleFormat(data[i]['ce_sales_v_central_percent_ce'])}</td>
                                <td>{simpleFormat(data[i]['bu_sales_v_central_percent_bu'])}</td>
                                <td>{simpleFormat(data[i]['vbu_sales_v_central_percent_vbu'])}</td>
                            </tr>
                            <tr>
                                <td>Net income (m)</td>
                                <td>{roundUpNumber(data[i]['vbe_net_income_m_vbe'])}</td>
                                <td>{roundUpNumber(data[i]['be_net_income_m_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_net_income_m_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_net_income_m_bu'])}</td>
                                <td>{roundUpNumber(data[i]['vbu_net_income_m_vbu'])}</td>
                            </tr>
                            <tr>
                                <td>NI margin (%)</td>
                                <td>{simpleFormat(data[i]['vbe_ni_margin_percent_vbe'])}</td>
                                <td>{simpleFormat(data[i]['be_ni_margin_percent_be'])}</td>
                                <td>{simpleFormat(data[i]['ce_ni_margin_percent_ce'])}</td>
                                <td>{simpleFormat(data[i]['bu_ni_margin_percent_bu'])}</td>
                                <td>{simpleFormat(data[i]['vbu_ni_margin_percent_vbu'])}</td>
                            </tr>
                            <tr>
                                <td>NI margin change (bp)</td>
                                <td>{roundUpNumber(data[i]['vbe_ni_margin_change_bp_vbe'])}</td>
                                <td>{roundUpNumber(data[i]['be_ni_margin_change_bp_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_ni_margin_change_bp_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_ni_margin_change_bp_bu'])}</td>
                                <td>{roundUpNumber(data[i]['vbu_ni_margin_change_bp_vbu'])}</td>
                            </tr>
                            <tr>
                                <td>AWSC (m)</td>
                                <td>{roundUpNumber(data[i]['vbe_awsc_m_vbe'])}</td>
                                <td>{roundUpNumber(data[i]['be_awsc_m_be'])}</td>
                                <td>{roundUpNumber(data[i]['ce_awsc_m_ce'])}</td>
                                <td>{roundUpNumber(data[i]['bu_awsc_m_bu'])}</td>
                                <td>{roundUpNumber(data[i]['vbu_awsc_m_vbu'])}</td>
                            </tr>

                            <tr className="bold-row">
                                <td className="bg-light-cream">EPS</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['vbe_eps_vbe'])}</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['be_eps_be'])}</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['ce_eps_ce'])}</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['bu_eps_bu'])}</td>
                                <td className="bg-light-cream">{format2Decimal(data[i]['vbu_eps_vbu'])}</td>
                            </tr>
                            </tbody>
                            </table>
                            <table className="table sens-table mt-2">
                                <tbody>
                            <tr className="bold-row">
                                <td className="bg-light-cream">EPS v Central %</td>
                                <td className="bg-light-cream">{data[i]['vbe_eps_v_central_percent_vbe']}</td>
                                <td className="bg-light-cream">{data[i]['be_eps_v_central_percent_be']}</td>
                                <td className="bg-light-cream">{data[i]['ce_eps_v_central_percent_ce']}</td>
                                <td className="bg-light-cream">{data[i]['bu_eps_v_buntral_percent_bu']}</td>
                                <td className="bg-light-cream">{data[i]['vbu_eps_v_central_percent_vbu']}</td>
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
                                <td className="bg-cream">{data[i]['dps_vbe1']}</td>
                                <td>{data[i]['dps_be1']}</td>
                                <td>{data[i]['dps_ce1']}</td>
                                <td>{data[i]['dps_be1']}</td>
                                <td>{data[i]['dps_vbe1']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_vbe2']}</td>
                                <td className="bg-cream">{data[i]['dps_be2']}</td>
                                <td>{data[i]['dps_ce2']}</td>
                                <td>{data[i]['dps_be2']}</td>
                                <td>{data[i]['dps_vbe2']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_vbe3']}</td>
                                <td>{data[i]['dps_be4']}</td>
                                <td className="bg-cream">{data[i]['dps_ce4']}</td>
                                <td>{data[i]['dps_be4']}</td>
                                <td>{data[i]['dps_vbe4']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_vbe4']}</td>
                                <td>{data[i]['dps_be4']}</td>
                                <td>{data[i]['dps_ce4']}</td>
                                <td className="bg-cream">{data[i]['dps_be4']}</td>
                                <td>{data[i]['dps_vbe4']}</td>
                            </tr>
                            <tr>
                                <td>{data[i]['payout_percent_very_bear']}</td>
                                <td>{data[i]['dps_vbe5']}</td>
                                <td>{data[i]['dps_be5']}</td>
                                <td>{data[i]['dps_ce5']}</td>
                                <td>{data[i]['dps_be5']}</td>
                                <td className="bg-cream">{data[i]['dps_vbe5']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        ))}

        </div>
        <div className="col-12 col-sm-5">
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
                            <tr>
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