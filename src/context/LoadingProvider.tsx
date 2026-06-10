import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({
  children,
  showLoader = true,
}: PropsWithChildren<{ showLoader?: boolean }>) => {
  const [isLoading, setIsLoading] = useState(showLoader);
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {}, [loading]);

  useEffect(() => {
    // When the loading screen is skipped (mobile — no 3D scene to wait
    // for), run the same intro reveal it would otherwise trigger so the
    // page becomes visible/scrollable.
    if (!showLoader) {
      import("../components/utils/initialFX").then((module) => {
        module.initialFX?.();
      });
    }
  }, [showLoader]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
