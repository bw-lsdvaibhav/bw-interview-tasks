import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import Page1 from '../../components/exam/report/theme16/Page1';
import { getThemeReport } from '../../api/exam/ReportAPI';
import Loader from '../../components/common/Loader';
import { FiDownload } from "react-icons/fi";
import style from '../../components/exam/report/theme16/theme16.module.css'

const Theme16 = () => {
  const router = useLocation();
  const [user, setUser] = useState({});
  const [brandReportData, setBrandReportData] = useState({});
  const [sortname, setSortName] = useState("");
  const [data, setData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [examDomains, setExamDoamains] = useState([]);
  const [orgTest, setOrgTest] = useState({});
  const [examSupportData, setExamSupportData] = useState([]);
  const [examdate, setExamDate] = useState("");
  const [inApiCall, setInApiCall] = useState(true);
  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', '#fff', 'important');
    document.documentElement.style.setProperty('--color', '#006597', 'important');
    document.documentElement.style.setProperty('--cover-bg', '#028697', 'important');
    const url = router.pathname.split("/")[3];
    const payload = { token: url, report_url: "" };
    async function get() {
      // getThemeReport(payload, onSuccess);
      onSuccess()
    }
    get();
  }, []);

  const onSuccess = async (response) => {
    const res = ReportJson;
    // const res = await response;
    const userData = res.user;
    const sortName = userData?.username?.split(" ")[0];
    const reportData = res.dynamic_report_data;
    const careerData = res.reportdata;
    const orgTestData = res.orgTest;
    const usertmpData = res.usertmp;
    const examSupportData = res.exam;
    const brandReport = res.brand_report_data;
    setBrandReportData(brandReport);
    let domains = {}
    examSupportData['domain'].map(item => { return domains[item.id] = item });
    const dateObj = new Date(usertmpData.exam_end_date);
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    setUser(userData);
    setSortName(sortName);
    setOrgTest(orgTestData);
    setCareerData(careerData);
    setExamSupportData(examSupportData);
    setExamDoamains(domains);
    setExamDate(formattedDate);
    setData(reportData);
    apiCallStatus();
  };
  const apiCallStatus = () => {
    setInApiCall(false);
  };

  if (inApiCall) { return <><div>Loading</div></> }
  return (
    <>
      <div className="container-fluid">
        <div className="row hide-print">
          <div className="col-md-12 col-sm-12 d-flex align-items-center justify-content-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => window.print()}
            >
              <FiDownload style={{ color: "#fff", width: "20px", height: "20px" }} />
              Download PDF
            </button>
            <br/>
          </div>
        </div>
        <div className="row">
          <div className="__u__report_preview">
            <div className='bg-light w-100'>
              <main className={style.reporttheme_16} id="reporttheme-16">                
                <Page1 brandReportData={brandReportData} />
                
              </main>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Theme16;