import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { setMeta } from "./utils/seo";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const Admin = lazy(() => import("./components/Admin"));
const ChatGPTAdsPage = lazy(() => import("./pages/ChatGPTAds"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogPostSanity = lazy(() => import("./pages/BlogPostSanity"));
import { LoadingProvider } from "./context/LoadingProvider";

const Loader = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"Geist,sans-serif", color:"#6366F1", fontSize:"18px" }}>
    Loading...
  </div>
);

const HomePage = () => {
  // The Three.js character scene is extremely main-thread heavy
  // (WebGL renderer + GLTF load + per-frame rAF loop). Only mount it
  // (and its loading screen) on desktop viewports — mobile never renders it.
  const [isDesktop] = useState(() => window.innerWidth > 1024);

  useEffect(() => {
    setMeta(
      "Harshit Mutha — AI Ads Expert & ChatGPT Ads Specialist",
      "Harshit Mutha helps brands scale using AI-powered advertising, ChatGPT Ads, and performance marketing systems that turn ad spend into predictable revenue."
    );
  }, []);

  return (
    <LoadingProvider showLoader={isDesktop}>
      <Suspense>
        <MainContainer>
          {isDesktop && (
            <Suspense fallback={null}>
              <CharacterModel />
            </Suspense>
          )}
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Suspense fallback={<Loader />}><Admin /></Suspense>} />
      <Route path="/chatgpt-ads" element={<Suspense fallback={<Loader />}><ChatGPTAdsPage /></Suspense>} />
      <Route path="/blog" element={<Suspense fallback={<Loader />}><BlogPage /></Suspense>} />
      <Route path="/blog/:slug" element={<Suspense fallback={<Loader />}><BlogPostSanity /></Suspense>} />
    </Routes>
  </BrowserRouter>
);

export default App;
