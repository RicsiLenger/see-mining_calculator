import '@/app/globals.css';
import bgImage from '@/public/background.png'
import IncomeSplitter from './incomesplitter/incomesplitter';

export default function Home() {

  const backgroundStyle = {
    backgroundImage: `url('${bgImage.src}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };



  return (
    <div style={backgroundStyle}>
      <div className='"m-0 p-0 flex flex-col box-border antialiased justify-center items-center'>
      <IncomeSplitter></IncomeSplitter>
      </div>
    </div>
  );
}
