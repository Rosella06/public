import './App.css';
import { CiLocationOn, CiMail, CiMobile3 } from "react-icons/ci";
import Shopee from './components/Home';


function App() {
  return (
      <main className='container'>
        <Shopee/>
        <h1 className='name'>Wanwisa Wongmee</h1>
        <p className='email'>
          <CiMail /> email:wanwisa4812@gmail.com &nbsp;&nbsp; 
          <CiMobile3 /> phone 091-7306197 &nbsp;&nbsp; 
          <CiLocationOn />44/320 No,1,Bangkhayaeng,MuangPathum 12000  
        </p>
        <div className='content'>
          <h2 className='EDUCATION'>EDUCATION</h2>
          <div>
            <h2 className='PRESENTs'>2020-PRESENT</h2>
            <h2 className='PRESENTs'>Bachelor Degree of Science (B.Sc.)</h2>
            <h2 className='PRESENTs'>Major Mathematics with Computer Science</h2>
            <h2 className='PRESENTs'>King Mongkut's University of Technology North Bangkok</h2>
          </div>
        </div>
        <div className='SKILLSflex'>
          <h2 className='SKILLS'>SKILLS</h2>
          <div className='line'></div>
        </div>
        <div className='PRESENT'>
          <h2 className='content1'>DATABASE</h2>
          <li>Power BI</li>
          <li>SQL Server</li>
          <li>ShaewPoint</li>
          <h2 className='PRESENT'>PROGRAMMING</h2>
          <li>C #</li>
          <li>Html,Css,Bootstrap,Javascript</li>
          <li>Excel VBA </li>
          <h2 className='PRESENT'>Computer Applicatons</h2>
          <li>Word</li>
          <li>Excel</li>
          <li>PowerPoint</li>
          <li>PowerApp</li>
        </div>
        <div className='SKILLSflex'>
          <h2 className='SKILLS'>PROJECTS</h2>
          <div className='line'></div>
        </div>
        <div className='PRESENT'>
          <div className='Projects'>
            <h2><li>Game</li></h2>
            <h2>2020/2021</h2>
          </div>
          <div className='PRESENT'></div>
          <p className='H3'>2048-2020 and Super BomberMan- 2021 Develop 2048 game and Super BomberMan game by using C# language</p>
          <div className='Projects'>
            <h2><li>POS Shop</li></h2>
            <h2>2021</h2>
          </div>
          <p className='H3'>Deverlop POS Gift shop by using C# language</p>
          <div className='Projects'>
            <h2><li>SA Projects</li></h2>
            <h2>2021</h2>
          </div>
          <p className='H3'>Design and analyze a technological monitoring system, P&L Group Company and fitness management systems</p>
          <div className='Projects'>
            <h2><li>Database Management Systems</li></h2>
            <h2>2022</h2>
          </div>
          <p className='H3'>Develop and design coffee shop system. Collect data in database (SQL Sever) and create a program for employees in C#</p>
          <div className='Projects'>
            <h2><li>Data analysis for business</li></h2>
            <h2>2022</h2>
          </div>
          <p className='H3'>Results of public opinion to government survey in 2022 by using power BI software.</p>
          <div className='Projects'>
            <h2><li>Web application</li></h2>
            <h2>2022</h2>
          </div>
          <p className='H3'>Developed Adopt a Pet web application by using angular</p>
        </div>
        <div className='SKILLSflex'>
          <h2 className='SKILLSS'>INTERNSHIP EXPERIENCE</h2>
          <div className='line'></div>
        </div>
        <div className='PRESENT'>
          <h2 className='PRESENT'>Lighthouse Worldeide Solutions-Thailand</h2>
          <h2 className='PRESENTs'>2 May 2023 -29 March (11 Months)</h2>
          <div className='PRESENT'></div>
          <h2 className='PRESENT'><li>Leave system, Car resevation system, Employee Database, IT asset information</li></h2>
          <p className='H3'>(Microsoft office 365) using SharePoint, Power App, Power Automate, outlook</p>
          <h2 className='PRESENT'><li>Lab5.0</li></h2>
          <p className='H3'>using Excel VBA (Visual Basic for Applications)</p>
        </div>
      </main>
  );
}

export default App;
