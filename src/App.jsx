import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { RouteProvider } from './contexts/RouteContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import ComoChegar from './pages/ComoChegar';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <RouteProvider>
            <ModalProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/como-chegar/:id?" element={<ComoChegar />} />
                  <Route path="/gallery" element={<Gallery />} />
                </Routes>
              </BrowserRouter>
            </ModalProvider>
          </RouteProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
