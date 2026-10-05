// Shared stage markup. {{v.key}} holes are filled from computeFrame(frame, format).
// The same markup lives inside the canvas preview (Main.dc.html), so keep both in step.
// Rules: inline styles only, SVG presentation via style (not attributes), no comments.

export const TEMPLATE = `
<div style="position: relative; overflow: hidden; width: {{v.W}}px; height: {{v.H}}px; background: #05070D; color: #FFFFFF; font-family: Manrope, 'Helvetica Neue', Arial, sans-serif">
  <div style="position: absolute; width: 1500px; height: 1100px; border-radius: 50%; background: radial-gradient(closest-side, rgba(37,99,235,0.40), rgba(37,99,235,0.12) 48%, rgba(5,7,13,0) 100%); {{v.bg}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 10px #3B82F6; {{v.p0}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 10px #3B82F6; {{v.p1}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 10px #3B82F6; {{v.p2}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 10px #3B82F6; {{v.p3}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 10px #3B82F6; {{v.p4}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 10px #3B82F6; {{v.p5}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 10px #3B82F6; {{v.p6}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #93C5FD; box-shadow: 0 0 10px #3B82F6; {{v.p7}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #93C5FD; box-shadow: 0 0 10px #3B82F6; {{v.p8}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #93C5FD; box-shadow: 0 0 10px #3B82F6; {{v.p9}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #93C5FD; box-shadow: 0 0 10px #3B82F6; {{v.p10}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #93C5FD; box-shadow: 0 0 10px #3B82F6; {{v.p11}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #DBEAFE; box-shadow: 0 0 10px #3B82F6; {{v.p12}}"></div>
  <div style="position: absolute; border-radius: 50%; background: #DBEAFE; box-shadow: 0 0 10px #3B82F6; {{v.p13}}"></div>

  <div style="position: absolute; width: 360px; transform: translateX(-50%); background: linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.16) 34%, rgba(96,165,250,0.55) 48.6%, rgba(219,234,254,0.95) 50%, rgba(96,165,250,0.55) 51.4%, rgba(37,99,235,0.16) 66%, rgba(37,99,235,0) 100%); {{v.beam}}"></div>

  <div style="position: absolute; {{v.s1}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.s1i}} white-space: nowrap; font-size: 64px; font-weight: 800; letter-spacing: -0.03em">Your next move.</div></div></div>

  <div style="position: absolute; {{v.meet}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.meetI}} white-space: nowrap; font-size: 84px; font-weight: 800; letter-spacing: -0.035em">Meet BagSwap.</div></div></div>
  <div style="position: absolute; {{v.sub}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.subI}} white-space: nowrap; font-size: 36px; font-weight: 600; letter-spacing: -0.01em; color: #CBD5E1">The memecoin <span style="color: #60A5FA">OTC</span> marketplace.</div></div></div>

  <div style="position: absolute; {{v.buy}}">
    <div style="box-sizing: border-box; width: 100%; padding: 26px 30px; border-radius: 22px; background: linear-gradient(160deg, rgba(14,44,32,0.94), rgba(7,13,19,0.96)); border: 1px solid rgba(52,211,153,0.30); box-shadow: 0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 18px">
      <div style="display: flex; align-items: center; gap: 16px">
        <div style="flex: none; width: 52px; height: 52px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FDE68A, #F59E0B 58%, #B45309)"></div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
          <div style="font-size: 26px; font-weight: 800">BONK</div>
          <div style="font-size: 16px; color: #94A3B8">Public buy offer</div>
        </div>
        <div style="font-size: 14px; font-weight: 800; letter-spacing: 0.12em; color: #6EE7B7; background: rgba(16,185,129,0.12); border: 1px solid rgba(52,211,153,0.32); padding: 8px 12px; border-radius: 8px">BUY OFFER</div>
      </div>
      <div style="display: flex; align-items: flex-end; justify-content: space-between">
        <div style="display: flex; flex-direction: column; gap: 2px"><div style="font-size: 44px; font-weight: 800; letter-spacing: -0.02em">1,000,000</div><div style="font-size: 15px; font-weight: 700; color: #94A3B8; letter-spacing: 0.08em">BONK</div></div>
        <div style="display: flex; flex-direction: column; gap: 2px; align-items: flex-end"><div style="font-size: 16px; color: #94A3B8">Buyer pays</div><div style="font-size: 30px; font-weight: 800">20 USDC</div></div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px">
        <div style="font-size: 15px; color: #94A3B8">Partial fills allowed</div>
        <div style="font-size: 17px; font-weight: 800; background: #E5485F; padding: 10px 18px; border-radius: 10px">Sell BONK</div>
      </div>
    </div>
  </div>

  <div style="position: absolute; {{v.sell}}">
    <div style="box-sizing: border-box; width: 100%; padding: 26px 30px; border-radius: 22px; background: linear-gradient(160deg, rgba(48,16,24,0.94), rgba(13,8,12,0.96)); border: 1px solid rgba(244,114,133,0.30); box-shadow: 0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 18px">
      <div style="display: flex; align-items: center; gap: 16px">
        <div style="flex: none; width: 52px; height: 52px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #F5D0A9, #C08457 58%, #7C4A2A)"></div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
          <div style="font-size: 26px; font-weight: 800">WIF</div>
          <div style="font-size: 16px; color: #94A3B8">Public sell listing</div>
        </div>
        <div style="font-size: 14px; font-weight: 800; letter-spacing: 0.12em; color: #FDA4AF; background: rgba(244,63,94,0.12); border: 1px solid rgba(244,114,133,0.32); padding: 8px 12px; border-radius: 8px">SELL LISTING</div>
      </div>
      <div style="display: flex; align-items: flex-end; justify-content: space-between">
        <div style="display: flex; flex-direction: column; gap: 2px"><div style="font-size: 44px; font-weight: 800; letter-spacing: -0.02em">100</div><div style="font-size: 15px; font-weight: 700; color: #94A3B8; letter-spacing: 0.08em">WIF</div></div>
        <div style="display: flex; flex-direction: column; gap: 2px; align-items: flex-end"><div style="font-size: 16px; color: #94A3B8">Seller asks</div><div style="font-size: 30px; font-weight: 800">50 USDC</div></div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px">
        <div style="font-size: 15px; color: #94A3B8">Review before confirming</div>
        <div style="font-size: 17px; font-weight: 800; color: #052E1B; background: #34D399; padding: 10px 18px; border-radius: 10px">Buy WIF</div>
      </div>
    </div>
  </div>

  <div style="position: absolute; {{v.note2}}"><div style="display: flex; align-items: center; gap: 10px; white-space: nowrap; font-size: 18px; font-weight: 600; color: #94A3B8; padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(148,163,184,0.22); background: rgba(15,23,42,0.6)"><svg viewBox="0 0 24 24" width="20" height="20" style="fill: none; stroke: #94A3B8; stroke-width: 2; stroke-linecap: round"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8v.01"></path></svg>Illustrative example · not live orders</div></div>

  <div style="position: absolute; height: 2px; background: linear-gradient(90deg, rgba(96,165,250,0), #93C5FD 20%, #DBEAFE 50%, #93C5FD 80%, rgba(96,165,250,0)); box-shadow: 0 0 18px 4px rgba(59,130,246,0.65); {{v.edge}}"></div>

  <div style="position: absolute; box-sizing: border-box; border-radius: 28px; background: linear-gradient(170deg, rgba(20,30,58,0.86), rgba(8,12,24,0.94)); border: 1px solid rgba(96,165,250,0.26); box-shadow: 0 40px 90px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07); transform-origin: 50% 50%; {{v.shell}}"></div>

  <div style="position: absolute; {{v.t1}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.t1i}} white-space: nowrap; font-size: 72px; font-weight: 800; letter-spacing: -0.035em">Your amount.</div></div></div>
  <div style="position: absolute; {{v.t2}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.t2i}} white-space: nowrap; font-size: 72px; font-weight: 800; letter-spacing: -0.035em">Your price.</div></div></div>
  <div style="position: absolute; {{v.t3}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.t3i}} white-space: nowrap; font-size: 72px; font-weight: 800; letter-spacing: -0.035em; color: #4F8DF9">Your terms.</div></div></div>

  <div style="position: absolute; width: 880px; height: 640px; transform-origin: 0 0; {{v.form}}">
    <div style="position: absolute; left: 112px; top: 40px; height: 56px; display: flex; align-items: center; font-size: 28px; font-weight: 800; letter-spacing: -0.01em">Create sell listing</div>
    <div style="position: absolute; right: 40px; top: 52px; font-size: 14px; font-weight: 800; letter-spacing: 0.14em; color: #93C5FD; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(147,197,253,0.35); background: rgba(37,99,235,0.12)">DEMO EXAMPLE</div>
    <div style="position: absolute; left: 40px; top: 132px; width: 800px; height: 132px; box-sizing: border-box; padding: 22px 26px; border-radius: 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(148,163,184,0.16); display: flex; flex-direction: column; justify-content: space-between">
      <div style="display: flex; justify-content: space-between; align-items: center"><div style="font-size: 18px; font-weight: 600; color: #94A3B8">You sell</div><div style="display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 800; padding: 6px 14px 6px 6px; border-radius: 999px; background: rgba(255,255,255,0.06)"><div style="width: 28px; height: 28px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FDE68A, #F59E0B 58%, #B45309)"></div>BONK</div></div>
      <div style="display: flex; align-items: center"><div style="{{v.amtC}} font-size: 52px; font-weight: 800; letter-spacing: -0.02em; line-height: 1">{{v.amt}}</div><div style="width: 3px; height: 44px; margin-left: 6px; background: #60A5FA; {{v.car1}}"></div></div>
    </div>
    <div style="position: absolute; left: 40px; top: 292px; width: 800px; height: 132px; box-sizing: border-box; padding: 22px 26px; border-radius: 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(148,163,184,0.16); display: flex; flex-direction: column; justify-content: space-between">
      <div style="display: flex; justify-content: space-between; align-items: center"><div style="font-size: 18px; font-weight: 600; color: #94A3B8">Total asking price</div><div style="display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 800; padding: 6px 14px 6px 6px; border-radius: 999px; background: rgba(255,255,255,0.06)"><div style="width: 28px; height: 28px; border-radius: 50%; background: #2775CA; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800">$</div>USDC</div></div>
      <div style="display: flex; align-items: center"><div style="{{v.priceC}} font-size: 52px; font-weight: 800; letter-spacing: -0.02em; line-height: 1">{{v.price}}</div><div style="width: 3px; height: 44px; margin-left: 6px; background: #60A5FA; {{v.car2}}"></div></div>
    </div>
    <div style="position: absolute; left: 40px; top: 452px; width: 388px; height: 108px; box-sizing: border-box; padding: 20px 26px; border-radius: 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(148,163,184,0.16); display: flex; flex-direction: column; justify-content: space-between">
      <div style="font-size: 18px; font-weight: 600; color: #94A3B8">Expires in</div>
      <div style="font-size: 30px; font-weight: 800">24 hours</div>
    </div>
    <div style="position: absolute; left: 452px; top: 452px; width: 388px; height: 108px; box-sizing: border-box; padding: 20px 26px; border-radius: 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(148,163,184,0.16); display: flex; align-items: center; justify-content: space-between">
      <div style="display: flex; flex-direction: column; gap: 12px"><div style="font-size: 18px; font-weight: 600; color: #94A3B8">Partial fills</div><div style="font-size: 30px; font-weight: 800">{{v.pf}}</div></div>
      <div style="position: relative; width: 64px; height: 36px; border-radius: 18px; background: #1E293B; overflow: hidden"><div style="position: absolute; left: 0; top: 0; width: 64px; height: 36px; background: #2563EB; {{v.trackOn}}"></div><div style="position: absolute; left: 4px; top: 4px; width: 28px; height: 28px; border-radius: 50%; background: #FFFFFF; {{v.knob}}"></div></div>
    </div>
    <div style="position: absolute; left: 40px; top: 586px; font-size: 17px; font-weight: 600; color: #94A3B8">Illustrative values · not a live quote</div>
    <div style="position: absolute; box-sizing: border-box; border-radius: 18px; border: 2px solid #3B82F6; box-shadow: 0 0 0 6px rgba(37,99,235,0.18), 0 0 34px rgba(37,99,235,0.45); {{v.ring}}"></div>
  </div>

  <div style="position: absolute; {{v.kn}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.knI}} white-space: nowrap; font-size: {{v.fsH}}px; font-weight: 800; letter-spacing: -0.035em">Know what changes hands.</div></div></div>

  <div style="position: absolute; width: 1100px; height: 700px; transform-origin: 0 0; {{v.rev}}">
    <div style="position: absolute; left: 112px; top: 40px; height: 56px; display: flex; align-items: center; font-size: 28px; font-weight: 800; letter-spacing: -0.01em">Review trade</div>
    <div style="position: absolute; right: 40px; top: 52px; font-size: 14px; font-weight: 800; letter-spacing: 0.14em; color: #93C5FD; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(147,197,253,0.35); background: rgba(37,99,235,0.12)">DEMO EXAMPLE</div>
    <div style="position: absolute; left: 40px; top: 116px; width: 500px; height: 220px; box-sizing: border-box; padding: 24px 28px; border-radius: 18px; background: rgba(255,255,255,0.035); border: 1px solid rgba(148,163,184,0.16); display: flex; flex-direction: column; gap: 16px; {{v.r1}}">
      <div style="display: flex; align-items: center; gap: 12px"><div style="font-size: 15px; font-weight: 800; letter-spacing: 0.14em; color: #FDA4AF">SELLER</div><div style="font-size: 18px; color: #94A3B8">You</div></div>
      <div style="display: flex; justify-content: space-between; align-items: baseline"><div style="font-size: 22px; color: #94A3B8">Sends</div><div style="font-size: 30px; font-weight: 800">1,000,000 BONK</div></div>
      <div style="display: flex; justify-content: space-between; align-items: baseline"><div style="font-size: 22px; color: #94A3B8">Receives</div><div style="font-size: 30px; font-weight: 800">19.9 USDC</div></div>
    </div>
    <div style="position: absolute; left: 560px; top: 116px; width: 500px; height: 220px; box-sizing: border-box; padding: 24px 28px; border-radius: 18px; background: rgba(255,255,255,0.035); border: 1px solid rgba(148,163,184,0.16); display: flex; flex-direction: column; gap: 16px; {{v.r2}}">
      <div style="display: flex; align-items: center; gap: 12px"><div style="font-size: 15px; font-weight: 800; letter-spacing: 0.14em; color: #6EE7B7">BUYER</div><div style="font-size: 18px; color: #94A3B8">Counterparty</div></div>
      <div style="display: flex; justify-content: space-between; align-items: baseline"><div style="font-size: 22px; color: #94A3B8">Pays</div><div style="font-size: 30px; font-weight: 800">20 USDC</div></div>
      <div style="display: flex; justify-content: space-between; align-items: baseline"><div style="font-size: 22px; color: #94A3B8">Receives</div><div style="font-size: 30px; font-weight: 800">1,000,000 BONK</div></div>
    </div>
    <div style="position: absolute; left: 40px; top: 364px; width: 1020px; height: 50px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; box-sizing: border-box; font-size: 24px; {{v.r3}}"><div style="color: #94A3B8">Buyer pays</div><div style="font-weight: 800">20 USDC</div></div>
    <div style="position: absolute; left: 40px; top: 414px; width: 1020px; height: 50px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; box-sizing: border-box; font-size: 24px; {{v.r4}}"><div style="color: #94A3B8">Seller platform fee · 0.5%</div><div style="font-weight: 800">−0.1 USDC</div></div>
    <div style="position: absolute; left: 40px; top: 466px; width: 1020px; height: 56px; border-radius: 12px; background: rgba(37,99,235,0.16); border: 1px solid rgba(96,165,250,0.4); box-sizing: border-box; {{v.hl}}"></div>
    <div style="position: absolute; left: 40px; top: 469px; width: 1020px; height: 50px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; box-sizing: border-box; font-size: 24px; {{v.r5}}"><div style="font-weight: 700">Seller receives</div><div style="font-weight: 800; font-size: 28px">19.9 USDC</div></div>
    <div style="position: absolute; left: 60px; top: 532px; font-size: 18px; color: #94A3B8; {{v.r6}}">Solana network fees are separate. Values are illustrative.</div>
    <div style="position: absolute; left: 40px; top: 584px; width: 1020px; height: 80px; {{v.r7}}">
      <div style="width: 100%; height: 100%; border-radius: 16px; background: #2563EB; box-shadow: 0 14px 40px rgba(37,99,235,0.45); display: flex; align-items: center; justify-content: center; gap: 14px; font-size: 26px; font-weight: 800; {{v.btn}}">
        <svg viewBox="0 0 24 24" width="28" height="28" style="fill: none; stroke: #FFFFFF; stroke-width: 2; stroke-linejoin: round"><path d="M3 7h15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7z"></path><path d="M3 7l12-3v3"></path><path d="M16 13.5h2"></path></svg>
        <div>{{v.btnL}}</div>
        <div style="width: 22px; height: 22px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); border-top-color: #FFFFFF; box-sizing: border-box; {{v.spin}}"></div>
        <div style="font-size: 15px; font-weight: 800; letter-spacing: 0.1em; padding: 6px 10px; border-radius: 8px; background: rgba(5,7,13,0.35); {{v.btnN}}">ILLUSTRATIVE · NO TRANSACTION</div>
      </div>
    </div>
  </div>

  <svg viewBox="0 0 {{v.W}} {{v.H}}" width="{{v.W}}" height="{{v.H}}" style="position: absolute; left: 0; top: 0; overflow: visible">
    <path d="{{v.arcD}}" style="fill: none; stroke: #60A5FA; stroke-width: 2; stroke-dasharray: 4 12; stroke-linecap: round; {{v.arc}}"></path>
    <path d="{{v.usdD}}" style="fill: none; stroke: #94A3B8; stroke-width: 2; stroke-dasharray: 4 12; stroke-linecap: round; {{v.usdArc}}"></path>
    <path d="{{v.arcD}}" pathLength="1" style="fill: none; stroke: #3B82F6; stroke-width: 4; stroke-linecap: round; filter: drop-shadow(0 0 8px #3B82F6); {{v.trail}}"></path>
  </svg>

  <div style="position: absolute; {{v.ill}}"><div style="display: flex; align-items: center; gap: 10px; white-space: nowrap; font-size: 18px; font-weight: 800; letter-spacing: 0.14em; color: #93C5FD; padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(147,197,253,0.3); background: rgba(15,23,42,0.6)">ILLUSTRATIVE HANDOFF</div></div>

  <div style="position: absolute; width: 340px; height: 300px; {{v.avS}}">
    <div style="position: absolute; left: 95px; top: 0; width: 150px; height: 150px; border-radius: 50%; box-shadow: 0 0 0 10px rgba(37,99,235,0.14), 0 0 70px rgba(37,99,235,0.6); {{v.ownS}}"></div>
    <div style="position: absolute; left: 95px; top: 0; width: 150px; height: 150px; box-sizing: border-box; border-radius: 50%; background: radial-gradient(circle at 50% 32%, #16285A, #0A1228 70%); border: 2px solid rgba(96,165,250,0.55); display: flex; align-items: center; justify-content: center"><svg viewBox="0 0 24 24" width="64" height="64" style="fill: none; stroke: #93C5FD; stroke-width: 1.6; stroke-linecap: round"><circle cx="12" cy="8.5" r="3.6"></circle><path d="M5 19.5c1.4-3.4 4-5 7-5s5.6 1.6 7 5"></path></svg></div>
    <div style="position: absolute; left: 0; top: 166px; width: 340px; text-align: center; font-size: 32px; font-weight: 800">Seller</div>
    <div style="position: absolute; left: 0; top: 218px; width: 340px; display: flex; justify-content: center; {{v.cSa}}"><div style="white-space: nowrap; font-size: 20px; font-weight: 700; color: #CBD5E1; padding: 9px 16px; border-radius: 999px; background: rgba(15,23,42,0.8); border: 1px solid rgba(148,163,184,0.25)">Holds 1,000,000 BONK</div></div>
    <div style="position: absolute; left: 0; top: 218px; width: 340px; display: flex; justify-content: center; {{v.cSb}}"><div style="white-space: nowrap; font-size: 20px; font-weight: 700; color: #DBEAFE; padding: 9px 16px; border-radius: 999px; background: rgba(37,99,235,0.22); border: 1px solid rgba(96,165,250,0.5)">Receives 19.9 USDC</div></div>
  </div>
  <div style="position: absolute; width: 340px; height: 300px; {{v.avB}}">
    <div style="position: absolute; left: 95px; top: 0; width: 150px; height: 150px; border-radius: 50%; box-shadow: 0 0 0 10px rgba(37,99,235,0.14), 0 0 70px rgba(37,99,235,0.6); {{v.ownB}}"></div>
    <div style="position: absolute; left: 95px; top: 0; width: 150px; height: 150px; box-sizing: border-box; border-radius: 50%; background: radial-gradient(circle at 50% 32%, #16285A, #0A1228 70%); border: 2px solid rgba(96,165,250,0.55); display: flex; align-items: center; justify-content: center"><svg viewBox="0 0 24 24" width="64" height="64" style="fill: none; stroke: #93C5FD; stroke-width: 1.6; stroke-linecap: round"><circle cx="12" cy="8.5" r="3.6"></circle><path d="M5 19.5c1.4-3.4 4-5 7-5s5.6 1.6 7 5"></path></svg></div>
    <div style="position: absolute; left: 0; top: 166px; width: 340px; text-align: center; font-size: 32px; font-weight: 800">Buyer</div>
    <div style="position: absolute; left: 0; top: 218px; width: 340px; display: flex; justify-content: center; {{v.cBa}}"><div style="white-space: nowrap; font-size: 20px; font-weight: 700; color: #CBD5E1; padding: 9px 16px; border-radius: 999px; background: rgba(15,23,42,0.8); border: 1px solid rgba(148,163,184,0.25)">Pays 20 USDC</div></div>
    <div style="position: absolute; left: 0; top: 218px; width: 340px; display: flex; justify-content: center; {{v.cBb}}"><div style="white-space: nowrap; font-size: 20px; font-weight: 700; color: #DBEAFE; padding: 9px 16px; border-radius: 999px; background: rgba(37,99,235,0.22); border: 1px solid rgba(96,165,250,0.5)">Holds 1,000,000 BONK</div></div>
  </div>

  <div style="position: absolute; height: 2px; background: linear-gradient(90deg, rgba(147,197,253,0), #DBEAFE 50%, rgba(147,197,253,0)); box-shadow: 0 0 16px 3px rgba(59,130,246,0.7); {{v.link}}"></div>
  <div style="position: absolute; width: 200px; height: 200px; box-sizing: border-box; border-radius: 50%; border: 2px solid #93C5FD; box-shadow: 0 0 40px rgba(59,130,246,0.7), inset 0 0 30px rgba(59,130,246,0.4); {{v.pulse}}"></div>
  <div style="position: absolute; width: 200px; height: 200px; box-sizing: border-box; border-radius: 50%; border: 2px solid #93C5FD; box-shadow: 0 0 30px rgba(59,130,246,0.6); {{v.land}}"></div>

  <div style="position: absolute; {{v.usd}}"><div style="display: flex; align-items: center; gap: 10px; white-space: nowrap; font-size: 22px; font-weight: 800; padding: 8px 16px 8px 8px; border-radius: 999px; background: rgba(10,18,40,0.92); border: 1px solid rgba(96,165,250,0.45); box-shadow: 0 0 24px rgba(37,99,235,0.35)"><div style="width: 32px; height: 32px; border-radius: 50%; background: #2775CA; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800">$</div>20 USDC</div></div>

  <div style="position: absolute; width: 380px; height: 380px; {{v.g3}}"><svg viewBox="0 0 200 200" width="380" height="380" style="display: block; overflow: visible; filter: blur(6px)"><path d="M58 20 C66 27 78 26 86 17 C93 10 107 10 114 17 C122 26 134 27 142 20 C147 16 153 20 150 26 L136 52 C114 58 86 58 64 52 L50 26 C47 20 53 16 58 20 Z" style="fill: #3B82F6"></path><path d="M70 62 C88 58 112 58 130 62 C162 78 186 114 184 146 C182 178 152 192 100 192 C48 192 18 178 16 146 C14 114 38 78 70 62 Z" style="fill: #3B82F6"></path></svg></div>
  <div style="position: absolute; width: 380px; height: 380px; {{v.g2}}"><svg viewBox="0 0 200 200" width="380" height="380" style="display: block; overflow: visible; filter: blur(5px)"><path d="M58 20 C66 27 78 26 86 17 C93 10 107 10 114 17 C122 26 134 27 142 20 C147 16 153 20 150 26 L136 52 C114 58 86 58 64 52 L50 26 C47 20 53 16 58 20 Z" style="fill: #3B82F6"></path><path d="M70 62 C88 58 112 58 130 62 C162 78 186 114 184 146 C182 178 152 192 100 192 C48 192 18 178 16 146 C14 114 38 78 70 62 Z" style="fill: #3B82F6"></path></svg></div>
  <div style="position: absolute; width: 380px; height: 380px; {{v.g1}}"><svg viewBox="0 0 200 200" width="380" height="380" style="display: block; overflow: visible; filter: blur(4px)"><path d="M58 20 C66 27 78 26 86 17 C93 10 107 10 114 17 C122 26 134 27 142 20 C147 16 153 20 150 26 L136 52 C114 58 86 58 64 52 L50 26 C47 20 53 16 58 20 Z" style="fill: #3B82F6"></path><path d="M70 62 C88 58 112 58 130 62 C162 78 186 114 184 146 C182 178 152 192 100 192 C48 192 18 178 16 146 C14 114 38 78 70 62 Z" style="fill: #3B82F6"></path></svg></div>

  <div style="position: absolute; width: 300px; height: 300px; box-sizing: border-box; border-radius: 50%; border: 2px solid #93C5FD; box-shadow: 0 0 50px rgba(59,130,246,0.7); {{v.flare}}"></div>

  <div style="position: absolute; width: 380px; height: 380px; {{v.bag}}">
    <svg viewBox="0 0 200 200" width="380" height="380" style="display: block; overflow: visible">
      <defs>
        <linearGradient id="bsBody" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" style="stop-color: #5B95FA"></stop>
          <stop offset="0.55" style="stop-color: #2563EB"></stop>
          <stop offset="1" style="stop-color: #1636A8"></stop>
        </linearGradient>
        <linearGradient id="bsSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style="stop-color: #DBEAFE; stop-opacity: 0"></stop>
          <stop offset="0.5" style="stop-color: #DBEAFE; stop-opacity: 0.6"></stop>
          <stop offset="1" style="stop-color: #DBEAFE; stop-opacity: 0"></stop>
        </linearGradient>
        <clipPath id="bsClip">
          <path d="M58 20 C66 27 78 26 86 17 C93 10 107 10 114 17 C122 26 134 27 142 20 C147 16 153 20 150 26 L136 52 C114 58 86 58 64 52 L50 26 C47 20 53 16 58 20 Z"></path>
          <path d="M70 62 C88 58 112 58 130 62 C162 78 186 114 184 146 C182 178 152 192 100 192 C48 192 18 178 16 146 C14 114 38 78 70 62 Z"></path>
        </clipPath>
      </defs>
      <g style="transform: translate(4px, 6px)">
        <path d="M58 20 C66 27 78 26 86 17 C93 10 107 10 114 17 C122 26 134 27 142 20 C147 16 153 20 150 26 L136 52 C114 58 86 58 64 52 L50 26 C47 20 53 16 58 20 Z" style="fill: #0A1F5C"></path>
        <path d="M70 62 C88 58 112 58 130 62 C162 78 186 114 184 146 C182 178 152 192 100 192 C48 192 18 178 16 146 C14 114 38 78 70 62 Z" style="fill: #0A1F5C"></path>
      </g>
      <g style="{{v.bagBody}}">
        <path d="M58 20 C66 27 78 26 86 17 C93 10 107 10 114 17 C122 26 134 27 142 20 C147 16 153 20 150 26 L136 52 C114 58 86 58 64 52 L50 26 C47 20 53 16 58 20 Z" style="fill: url(#bsBody)"></path>
        <path d="M70 62 C88 58 112 58 130 62 C162 78 186 114 184 146 C182 178 152 192 100 192 C48 192 18 178 16 146 C14 114 38 78 70 62 Z" style="fill: url(#bsBody)"></path>
        <ellipse cx="58" cy="112" rx="14" ry="30" style="fill: #DBEAFE; opacity: 0.16; transform: rotate(26deg); transform-origin: 58px 112px"></ellipse>
      </g>
      <path d="M58 20 C66 27 78 26 86 17 C93 10 107 10 114 17 C122 26 134 27 142 20 C147 16 153 20 150 26 L136 52 C114 58 86 58 64 52 L50 26 C47 20 53 16 58 20 Z" style="fill: none; stroke: #93C5FD; stroke-width: 1.6; stroke-opacity: 0.9"></path>
      <path d="M70 62 C88 58 112 58 130 62 C162 78 186 114 184 146 C182 178 152 192 100 192 C48 192 18 178 16 146 C14 114 38 78 70 62 Z" style="fill: none; stroke: #93C5FD; stroke-width: 1.6; stroke-opacity: 0.9"></path>
      <g style="clip-path: url(#bsClip)"><g style="{{v.sheen}}"><rect x="0" y="-20" width="60" height="240" transform="skewX(-16)" style="fill: url(#bsSheen)"></rect></g></g>
      <text x="101" y="166" style="font-family: Manrope, 'Helvetica Neue', Arial, sans-serif; font-weight: 800; font-size: 104px; fill: #05070D; text-anchor: middle; transform: rotate(-6deg); transform-origin: 101px 130px; {{v.bagB}}">B</text>
    </svg>
  </div>

  <div style="position: absolute; {{v.nh}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.nhI}} white-space: nowrap; font-size: 80px; font-weight: 800; letter-spacing: -0.035em">New hands.</div></div></div>
  <div style="position: absolute; {{v.sb}}"><div style="overflow: hidden; padding: 0.1em 0.05em"><div style="{{v.sbI}} white-space: nowrap; font-size: 80px; font-weight: 800; letter-spacing: -0.035em; color: #4F8DF9">Same bags.</div></div></div>

  <div style="position: absolute; {{v.wm}}"><div style="overflow: hidden; padding: 0.1em 0.1em"><div style="{{v.wmI}} white-space: nowrap; font-size: 132px; font-weight: 800; line-height: 1.05">BagSwap</div></div></div>
  <div style="position: absolute; {{v.tag}}"><div style="white-space: nowrap; font-size: 40px; font-weight: 700; letter-spacing: -0.02em; color: #CBD5E1">New hands. <span style="color: #4F8DF9">Same bags.</span></div></div>
  <div style="position: absolute; {{v.cta}}"><div style="display: flex; align-items: center; gap: 14px; white-space: nowrap; font-size: 30px; font-weight: 800; padding: 22px 36px; border-radius: 16px; background: #2563EB; box-shadow: 0 16px 50px rgba(37,99,235,0.5)">Explore the public testnet<svg viewBox="0 0 24 24" width="28" height="28" style="fill: none; stroke: #FFFFFF; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></div></div>
  <div style="position: absolute; {{v.url}}"><div style="white-space: nowrap; font-size: 36px; font-weight: 700; letter-spacing: -0.01em; color: #93C5FD">usebagswap.com</div></div>
  <div style="position: absolute; {{v.sup}}"><div style="display: flex; align-items: center; gap: 12px; white-space: nowrap; font-size: 22px; font-weight: 600; color: #94A3B8; padding: 12px 22px; border-radius: 999px; border: 1px solid rgba(148,163,184,0.22); background: rgba(15,23,42,0.6)"><svg viewBox="0 0 24 24" width="22" height="22" style="fill: none; stroke: #93C5FD; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3"></path><path d="M7.5 15h9"></path></svg><span style="color: #FFFFFF; font-weight: 800">Solana devnet</span> · Test tokens only · Mainnet disabled</div></div>

  <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; background: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)"></div>
</div>
`;
