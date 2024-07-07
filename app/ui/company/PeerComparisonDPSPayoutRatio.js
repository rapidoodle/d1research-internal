export default function PeerComparisonDPSPayoutRatio({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card peer-comparison flex-fill">
            <h4>Peer comparison DPS payout ratio (%)</h4>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive">
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
    </>
    );
}