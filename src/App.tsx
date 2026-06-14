import './index.css';
import './App.css';
import FeaturedSection from './components/FeaturedSection';
import WelcomeView from './components/WelcomeView';

export default function App() {
  return (
    <div>
      <WelcomeView/>

      <FeaturedSection />

    </div>
  );
}