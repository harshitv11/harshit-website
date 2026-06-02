import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { setMeta } from "./utils/seo";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const Admin = lazy(() => import("./components/Admin"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const ChatGPTAdsPage = lazy(() => import("./pages/ChatGPTAds"));
import { LoadingProvider } from "./context/LoadingProvider";

const HomePage = () => {
  useEffect(() => {
    setMeta(
      "Harshit Mutha — AI Ads Expert & ChatGPT Ads Specialist",
      "Harshit Mutha helps brands scale using AI-powered advertising, ChatGPT Ads, and performance marketing systems that turn ad spend into predictable revenue."
    );
  }, []);

  return (
    <LoadingProvider>
      <Suspense>
        <MainContainer>
          <Suspense>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

const AdminPage = () => {
  return (
    <Suspense fallback={
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"Geist,sans-serif", color:"#6366F1", fontSize:"18px" }}>
        Loading Admin...
      </div>
    }>
      <Admin />
    </Suspense>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/chatgpt-ads" element={
          <Suspense fallback={<div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"Geist,sans-serif", color:"#6366F1" }}>Loading...</div>}>
            <ChatGPTAdsPage />
          </Suspense>
        } />
        <Route path="/blog/:slug" element={
          <Suspense fallback={<div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"Geist,sans-serif", color:"#6366F1" }}>Loading...</div>}>
            <BlogPostPage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
