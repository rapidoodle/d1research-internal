import React from 'react';
import '@/app/company-page.css';
import Image from 'next/image';

export default function CompanyOverview() {

  return (
    <div className="financial-overview">
      <div className="d-flex justify-content-between header-container">
          <div className="header-title">
            <Image 
              src='/images/company-logo-rectangle.png' 
              width={200}
              height={100}
              alt='company logo' />
          </div>
          <div className="company-details">
            <div className='d-flex'>
              <div className='semi-card mb-3'><b>Company Name:</b> Mercedes</div>
              <div className='semi-card mb-3 ms-3'><b>DIV Ticker:</b> D3AI</div>
            </div>
            <div className='d-flex'>
              <div className='semi-card'><b>Ticker:</b> MBG GY EQUITY</div>
              <div className='semi-card ms-3'><b>Dividend Index:</b> -</div>
            </div>
          </div>
        </div>
      <div className="row mt-2">
        <div className="col-8">
          <div className="card dps-forecast">
            <div>
            <h4>D1 DPS forecast</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Z4</th>
                  <th>Z5</th>
                  <th>Z6</th>
                  <th>Z7</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DPS forecast</td>
                  <td>5.30</td>
                  <td>4.75</td>
                  <td>4.90</td>
                  <td>5.10</td>
                </tr>
                <tr>
                  <td>Current Price</td>
                  <td>5.30</td>
                  <td>4.88</td>
                  <td>5.48</td>
                  <td>4.22</td>
                </tr>
                <tr>
                  <td>Difference %</td>
                  <td>0%</td>
                  <td className='text-danger'>3%</td>
                  <td className='text-success'>-7%</td>
                  <td className='text-success'>17%</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          <div className="card risk-scenarios">
            <h4>Risk scenarios</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Z4</th>
                  <th>Z5</th>
                  <th>Z6</th>
                  <th>Z7</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>V Bear (10%)</td>
                  <td>-</td>
                  <td>3.00</td>
                  <td>2.20</td>
                  <td>1.50</td>
                </tr>
                <tr>
                  <td>Bear (20%)</td>
                  <td>-</td>
                  <td>4.00</td>
                  <td>3.80</td>
                  <td>3.50</td>
                </tr>
                <tr>
                  <td>Central (40%)</td>
                  <td>5.30</td>
                  <td>4.75</td>
                  <td>4.90</td>
                  <td>5.10</td>
                </tr>
                <tr>
                  <td>Bull (20%)</td>
                  <td>-</td>
                  <td>5.30</td>
                  <td>5.45</td>
                  <td>5.80</td>
                </tr>
                <tr>
                  <td>V Bull (10%)</td>
                  <td>-</td>
                  <td>5.90</td>
                  <td>6.05</td>
                  <td>6.50</td>
                </tr>
                <tr>
                  <td>Risk adj. DPS</td>
                  <td>-</td>
                  <td>4.61</td>
                  <td>4.64</td>
                  <td>4.70</td>
                </tr>
                <tr className='highlight'>
                  <td>Difference to Central</td>
                  <td>-</td>
                  <td>-3%</td>
                  <td>-5%</td>
                  <td>-8%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card overview-financials">
            <h4>Overview Financials</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>FY23</th>
                  <th>FY24</th>
                  <th>FY25</th>
                  <th>FY26</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className='py-4 px-0 second-title'>
                    <div className='bg-cream'>Profit & Loss</div>
                  </td>
                </tr>
                <tr>
                  <td>Net income</td>
                  <td>14,261</td>
                  <td>12,123</td>
                  <td>11,880</td>
                  <td>12,163</td>
                </tr>
                <tr>
                  <td>AWSC</td>
                  <td>1,060</td>
                  <td>1,013</td>
                  <td>965</td>
                  <td>926</td>
                </tr>
                <tr>
                  <td>EPS</td>
                  <td>13.46</td>
                  <td>11.96</td>
                  <td>12.31</td>
                  <td>13.14</td>
                </tr>
                <tr>
                  <td>DPS</td>
                  <td>5.30</td>
                  <td>4.75</td>
                  <td>4.90</td>
                  <td>5.10</td>
                </tr>
                <tr>
                  <td>Payout %</td>
                  <td>39</td>
                  <td>40</td>
                  <td>40</td>
                  <td>39</td>
                </tr>
                <tr>
                  <td colSpan={5} className='py-4 px-0 second-title'>
                    <div className='bg-cream'>Cf Statement</div>
                  </td>
                </tr>
                <tr>
                  <td>op CF</td>
                  <td>14,470</td>
                  <td>19,802</td>
                  <td>19,716</td>
                  <td>22,299</td>
                </tr>
                <tr className='highlight'>
                  <td>Investments</td>
                  <td>-8,213.00</td>
                  <td>-8,404.59</td>
                  <td>-8,592.94</td>
                  <td>-8,821.42</td>
                </tr>
                <tr>
                  <td>FCF</td>
                  <td>6,257</td>
                  <td>11,397</td>
                  <td>11,333</td>
                  <td>14,178</td>
                </tr>
                <tr className='highlight'>
                  <td>Div</td>
                  <td>-5.556</td>
                  <td>-5.615</td>
                  <td>-4.812</td>
                  <td>-4.730</td>
                </tr>
                <tr className='highlight'>
                  <td>Share BB</td>
                  <td>-1.941</td>
                  <td>-4.059</td>
                  <td>-3.000</td>
                  <td>-3.000</td>
                </tr>
                <tr>
                  <td colSpan={5} className='py-4 px-0 second-title'>
                    <div className='bg-cream'>B/S</div>
                  </td>
                </tr>
                <tr>
                  <td>Net Cash (incl. Div)</td>
                  <td>31,659</td>
                  <td>34,067</td>
                  <td>36,243</td>
                  <td>39,131</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card share-capital">
            <h4>Share Capital</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>FY23</th>
                  <th>FY24</th>
                  <th>FY25</th>
                  <th>FY26</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Shares in issue</td>
                  <td>1,070</td>
                  <td>1,014</td>
                  <td>974</td>
                  <td>935</td>
                </tr>
                <tr>
                  <td>Treasury shares</td>
                  <td>-29</td>
                  <td>-29</td>
                  <td>-29</td>
                  <td>-29</td>
                </tr>
                <tr>
                  <td>Shares outstanding</td>
                  <td>1,041</td>
                  <td>985</td>
                  <td>945</td>
                  <td>906</td>
                </tr>
                <tr>
                  <td>Av. Weigh. Sh. cap</td>
                  <td>1,060</td>
                  <td>1,013</td>
                  <td>965</td>
                  <td>926</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card total-cap-return">
            <h4>Total Capital Return</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>FY23</th>
                  <th>FY24</th>
                  <th>FY25</th>
                  <th>FY26</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dividend</td>
                  <td>5.556</td>
                  <td>5.615</td>
                  <td>4.813</td>
                  <td>4.730</td>
                </tr>
                <tr>
                  <td>Share Buyback</td>
                  <td>1,941</td>
                  <td>4.059</td>
                  <td>3.000</td>
                  <td>3.000</td>
                </tr>
                <tr>
                  <td>Total Cap Return</td>
                  <td>7,497</td>
                  <td>9,674</td>
                  <td>7,813</td>
                  <td>7,730</td>
                </tr>
                <tr>
                  <td>Net inc per before</td>
                  <td>14,261</td>
                  <td>12,123</td>
                  <td>11,880</td>
                  <td>12,163</td>
                </tr>
                <tr>
                  <td>Capital payout (%)</td>
                  <td>52</td>
                  <td>68</td>
                  <td>64</td>
                  <td>65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-4">
          <div className="card analyst-comments">
            <div className='d-flex justify-content-between align-items-center'>
              <h4>D1 Analyst comments </h4>
              <a href="#" className='text-link'>View All Comments</a>
            </div>
            <hr />
            <p>Q1 earnings comment:</p>
            <ul>
              <li>Moving central DPS forecast to 4.75 from EUR5.00 to EUR4.75, dividend risk increasing after weak Q1 results (weakness also seen in peers).</li>
              <li>At EUR4.88, the z5 currently still trades relatively strong in my view. I would expect the recent upward trend to reverse. Given my forecast and the growing downside risks, we would need to see a price of EUR4.25-4.50 for the z5 to be interesting again. No need to get involved here on the long side</li>
              <li>Net income weak at -34%; risk to FY earnings guidance rising. Company still pointing to 5-15% EBIT decline at FY24; that may see downward revision. Consensus however already at -17%, hence some more weakness already priced in.</li>
            </ul>
            <div className='mt-3'>
              <h4>Latest management statement</h4>
              <hr />
              <p>15/5/24: bla bla bla...</p>
              <p>10/04/2024: bla bla bla...</p>
            </div>

            <div className='mt-3'>
              <h4>Capital return policy</h4>
              <hr />
              <ul>
                <li>Payout ratio of 40% of net profit attributable to MBG</li>
                <li>shareholders; FCF from industrial biz also taken into acc</li>
              </ul>
            </div>
          </div>

          <div className="card upcoming-events">
            <h4>Upcoming events</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Confirmed and expected events</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-05-19</td>
                  <td>AGM</td>
                </tr>
                <tr>
                  <td>2024-07-19</td>
                  <td>h4 results</td>
                </tr>
                <tr>
                  <td>2024-11-03</td>
                  <td>Q3 results</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card dps-calendar">
            <h4>DPS calendar</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Q1</th>
                  <th>Q2</th>
                  <th>Q3</th>
                  <th>Q4</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2015</td>
                  <td>2.45</td>
                  <td>-</td>
                  <td>-</td>
                  <td>0.00</td>
                  <td>2.45</td>
                </tr>
                <tr>
                  <td>2016</td>
                  <td>-</td>
                  <td>3.25</td>
                  <td>-</td>
                  <td>3.65</td>
                  <td>6.90</td>
                </tr>
                <tr>
                  <td>2017</td>
                  <td>-</td>
                  <td>-</td>
                  <td>3.25</td>
                  <td>3.90</td>
                  <td>7.15</td>
                </tr>
                <tr>
                  <td>2018</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>0.90</td>
                  <td>0.90</td>
                </tr>
                <tr>
                  <td>2019</td>
                  <td>-</td>
                  <td>-</td>
                  <td>1.35</td>
                  <td>1.35</td>
                  <td>2.70</td>
                </tr>
                <tr>
                  <td>2020</td>
                  <td>-</td>
                  <td>-</td>
                  <td>5.00</td>
                  <td>-</td>
                  <td>5.00</td>
                </tr>
                <tr>
                  <td>2021</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>1.35</td>
                  <td>1.35</td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>5.00</td>
                  <td>5.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card ex-div-calendar">
            <h4>Ex Div calendar</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Q1</th>
                  <th>Q2</th>
                  <th>Q3</th>
                  <th>Q4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2021</td>
                  <td>02-Feb.</td>
                  <td>03-Apr.</td>
                  <td>-</td>
                  <td>02-Nov.</td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>24-Dec.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card peer-comparison mb-0">
            <h4>Peer comparison DPS payout ratio (%)</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>FY23</th>
                  <th>FY24</th>
                  <th>FY25</th>
                  <th>FY26</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MBG</td>
                  <td>39</td>
                  <td>40</td>
                  <td>40</td>
                  <td>39</td>
                </tr>
                <tr>
                  <td>VW</td>
                  <td>28</td>
                  <td>30</td>
                  <td>28</td>
                  <td>32</td>
                </tr>
                <tr>
                  <td>BMW</td>
                  <td>34</td>
                  <td>35</td>
                  <td>36</td>
                  <td>38</td>
                </tr>
                <tr>
                  <td>STLAM</td>
                  <td>26</td>
                  <td>31</td>
                  <td>28</td>
                  <td>31</td>
                </tr>
                <tr>
                  <td>RNO</td>
                  <td>17</td>
                  <td>25</td>
                  <td>28</td>
                  <td>31</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};