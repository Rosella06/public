import { CiLocationOn, CiMail, CiMobile3 } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Resume() {
  return (
    <main style={{ padding: '1.5cm' }}>
      <div className='flex justify-end'>
        <div className='nav-contents'>
        </div>
        <ul className='barss flex space-x-6'>
          <li><Link to="/resume" className="btn btn-outline border-t-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">Resume</Link></li>
          <li><Link to="/" className="btn btn-outline border-t-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">Shopee</Link></li>
        </ul>
      </div>

      <h1 className='name text-yellow-400' style={{ fontSize: '3rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Wanwisa Wongmee</h1>

      <p className='email bg-white border border-yellow-400'>
        <CiMail className='inline' /> email: wanwisa4812@gmail.com &nbsp;&nbsp;
        <CiMobile3 className='inline' /> phone 091-7306197 &nbsp;&nbsp;
        <CiLocationOn className='inline' /> 44/320 No,1,Bangkhayaeng,MuangPathum 12000
      </p>
      <div className='content' style={{ marginTop: '1.5cm' }}>
        <h2 className='EDUCATION text-yellow-400'>EDUCATION</h2>
        <div>
          <h2 className='PRESENTs'>2020-PRESENT</h2>
          <h2 className='PRESENTs'>Bachelor Degree of Science (B.Sc.)</h2>
          <h2 className='PRESENTs'>Major Mathematics with Computer Science</h2>
          <h2 className='PRESENTs'>King Mongkut's University of Technology North Bangkok</h2>
        </div>
      </div>
      <div className='SKILLSflex' style={{ marginTop: '1.5cm' }}>
        <h2 className='SKILLS text-yellow-400'>SKILLS</h2>
        <div className='line h-px bg-yellow-400'></div>
      </div>
      <div className='PRESENT'>
        <h2 className='content1'>DATABASE</h2>
        <ul>
          <li>Power BI</li>
          <li>SQL Server</li>
          <li>SharePoint</li>
        </ul>
        <h2 className='PRESENT'>PROGRAMMING</h2>
        <ul>
          <li>C#</li>
          <li>Html, Css, Bootstrap, Javascript</li>
          <li>Excel VBA</li>
        </ul>
        <h2 className='PRESENT'>Computer Applications</h2>
        <ul>
          <li>Word</li>
          <li>Excel</li>
          <li>PowerPoint</li>
          <li>PowerApp</li>
        </ul>
      </div>
      <div className='SKILLSflex' style={{ marginTop: '1.5cm' }}>
        <h2 className='SKILLS text-yellow-400'>PROJECTS</h2>
        <div className='line h-px bg-yellow-400'></div>
      </div>
      <div className='PRESENT'>
        <div className='Projects'>
          <h2><li>Game</li></h2>
          <h2>2020/2021</h2>
        </div>
        <p className='H3'>2048-2020 and Super BomberMan- 2021 Develop 2048 game and Super BomberMan game by using C# language</p>
        <div className='Projects'>
          <h2><li>POS Shop</li></h2>
          <h2>2021</h2>
        </div>
        <p className='H3'>Develop POS Gift shop by using C# language</p>
        <div className='Projects'>
          <h2><li>SA Projects</li></h2>
          <h2>2021</h2>
        </div>
        <p className='H3'>Design and analyze a technological monitoring system, P&L Group Company and fitness management systems</p>
        <div className='Projects'>
          <h2><li>Database Management Systems</li></h2>
          <h2>2022</h2>
        </div>
        <p className='H3'>Develop and design coffee shop system. Collect data in database (SQL Server) and create a program for employees in C#</p>
        <div className='Projects'>
          <h2><li>Data analysis for business</li></h2>
          <h2>2022</h2>
        </div>
        <p className='H3'>Results of public opinion to government survey in 2022 by using Power BI software.</p>
        <div className='Projects'>
          <h2><li>Web application</li></h2>
          <h2>2022</h2>
        </div>
        <p className='H3'>Developed Adopt a Pet web application by using Angular</p>
      </div>
      <div className='SKILLSflex' style={{ marginTop: '1.5cm' }}>
        <h2 className='SKILLSS text-yellow-400'>INTERNSHIP EXPERIENCE</h2>
        <div className='line h-px bg-yellow-400'></div>
      </div>
      <div className='PRESENT'>
        <h2 className='PRESENT'>Lighthouse Worldwide Solutions-Thailand</h2>
        <h2 className='PRESENTs'>2 May 2023 - 29 March 2024 (11 Months)</h2>
        <div className='PRESENT'></div>
        <ul className='PRESENT'>
          <li>Leave system, Car reservation system, Employee Database, IT asset information</li>
        </ul>
        <p className='H3'>(Microsoft Office 365) using SharePoint, Power App, Power Automate, Outlook</p>
        <ul className='PRESENT'>
          <li>Lab5.0</li>
        </ul>
        <p className='H3'>Using Excel VBA (Visual Basic for Applications)</p>
      </div>
    </main>
  );
}

export default Resume;
