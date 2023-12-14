import { a, useTransition } from "@react-spring/web";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useMint } from "../hooks/views/useMint";
import { useProfile } from "../hooks/views/useProfile";
import { useHypercerts } from "../hooks/views/useHypercerts";

import Mint from "./Mint";
import Profile from "./Profile";
import Hypercerts from "./Hypercerts";

export default function Views() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
    config: {
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  const mint = useMint();
  const profile = useProfile();
  const hypercerts = useHypercerts();

  return transitions((style, location) => (
    <a.main
      className={`flex h-[calc(100dvh-3.5rem)] overflow-hidden max-h-[calc(100dvh-3.5rem)] overflow-y-contain`}
      style={style}
    >
      <Route path="mint" element={<Mint {...mint} />} />
      <Route path="profile" element={<Profile {...profile} />} />
      <Routes location={location}>
        <Route path="hypercerts" element={<Hypercerts {...hypercerts} />}>
          <Route path=":address" element={<></>} />
        </Route>
        <Route path="*" element={<Navigate to="profile" />} />
      </Routes>
    </a.main>
  ));
}
