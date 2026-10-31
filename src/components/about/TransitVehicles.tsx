type IllustrationProps = { className?: string };

const silver = {
  body: "#d8dfe2",
  upper: "#edf0f1",
  edge: "#879398",
  lower: "#b2bdc2",
  glass: "#253a43",
  reflection: "#45616c",
  green: "#00a84d",
};

function TrainDoor({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="64" width="42" height="98" rx="2" fill="#c4ced2" stroke={silver.edge} strokeWidth="1" />
      <path d="M21 65 V161" stroke="#738087" strokeWidth="1.2" />
      <rect x="5" y="72" width="12" height="35" rx="3" fill={silver.glass} />
      <rect x="25" y="72" width="12" height="35" rx="3" fill={silver.glass} />
      <path d="M7 75 H15 V81 L7 88 Z M27 75 H35 V81 L27 88 Z" fill={silver.reflection} />
      <path d="M2 120 H19 M23 120 H40" stroke={silver.green} strokeWidth="10" />
      <path d="M17 133 V143 M25 133 V143" stroke="#68767e" strokeWidth="1.5" />
      <path d="M1 163 H41" stroke="#52616a" strokeWidth="2" />
    </g>
  );
}

function TrainWindow({ x, width }: { x: number; width: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="67" width={width} height="39" rx="4" fill="#657780" />
      <rect x="2" y="69" width={width - 4} height="35" rx="3" fill={silver.glass} />
      <path d={`M4 72 H${width - 4} V79 L4 94 Z`} fill={silver.reflection} />
      <path d={`M4 102 H${width - 4}`} stroke="#81949b" strokeWidth="1" />
    </g>
  );
}

function TrainBogie({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M-31 169 H31 L25 180 H-25 Z" fill="#4c585e" />
      {[-19, 19].map((wheel) => (
        <g key={wheel}>
          <circle cx={wheel} cy="182" r="10" fill="#252d32" />
          <circle cx={wheel} cy="182" r="6" fill="#6d7980" />
          <circle cx={wheel} cy="182" r="2.4" fill="#b5bec2" />
        </g>
      ))}
      <path d="M-24 173 H24" stroke="#879198" strokeWidth="3" />
      <path d="M-4 168 V179 M4 168 V179" stroke="#283238" strokeWidth="2" />
    </g>
  );
}

function TrainCar({ x, front = false }: { x: number; front?: boolean }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d={front ? "M9 51 H273 Q291 51 300 66 L311 89 V157 Q311 168 301 168 H9 Q3 168 3 160 V59 Q3 51 9 51Z" : "M12 51 H296 Q306 51 306 62 V158 Q306 168 296 168 H12 Q3 168 3 158 V61 Q3 51 12 51Z"} fill={silver.body} stroke={silver.edge} strokeWidth="1.4" />
      <path d={front ? "M11 53 H272 Q289 53 296 66 H5 V60 Q5 53 11 53Z" : "M12 53 H296 Q304 53 304 63 H5 V61 Q5 53 12 53Z"} fill={silver.upper} />
      <path d={front ? "M5 145 H309 V157 Q309 166 300 166 H11 Q5 166 5 159Z" : "M5 145 H304 V158 Q304 166 296 166 H12 Q5 166 5 158Z"} fill={silver.lower} />
      <path d={front ? "M5 120 H295 L310 110" : "M5 120 H304"} fill="none" stroke={silver.green} strokeWidth="10" />
      <path d="M13 150 H294 M13 156 H294" stroke="#9aa8af" strokeWidth="0.8" />
      <path d="M27 50 V45 Q27 41 33 41 H270 Q278 41 278 48 V50" fill="#aab7bd" stroke="#879398" strokeWidth="1" />
      <path d="M36 43 H268" stroke="#d8e0e4" strokeWidth="1.5" />
      <rect x="113" y="32" width="71" height="9" rx="2" fill="#8e9ca3" />
      <path d="M120 35 H177 M120 38 H177" stroke="#d0d8dc" strokeWidth="1" />
      <TrainWindow x={15} width={37} />
      <TrainDoor x={61} />
      <TrainWindow x={113} width={78} />
      <TrainDoor x={201} />
      {front ? (
        <>
          <path d="M255 68 H275 Q285 68 291 80 L300 99 H255Z" fill={silver.glass} />
          <path d="M258 71 H274 Q281 71 285 78 L258 93Z" fill={silver.reflection} />
          <path d="M280 69 V99" stroke="#bdc9ce" strokeWidth="2" />
          <path d="M303 105 V133" stroke="#61717b" strokeWidth="1.2" />
          <rect x="298" y="139" width="9" height="6" rx="1" fill="#f3edd1" />
          <path d="M306 157 H315" stroke="#405059" strokeWidth="3" />
        </>
      ) : <TrainWindow x={253} width={39} />}
      <path d="M34 169 H275 V173 H34Z" fill="#59676f" />
      <rect x="119" y="173" width="51" height="10" rx="1" fill="#63727a" />
      <path d="M125 176 H164 M125 179 H164" stroke="#839097" strokeWidth="1" />
      <TrainBogie x={70} />
      <TrainBogie x={244} />
    </g>
  );
}

/** Brand illustration: a generic urban train, with no invented route or vehicle number. */
export function TrainIllustration({ className = "h-auto w-full" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 1000 220" className={className} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      {[333, 660].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <rect x="-11" y="66" width="22" height="88" rx="2" fill="#303d44" />
          <path d="M-7 69 V151 M-2 69 V151 M3 69 V151 M8 69 V151" stroke="#64727a" strokeWidth="1.3" />
          <path d="M-13 164 H13" stroke="#3d4c54" strokeWidth="5" />
        </g>
      ))}
      <TrainCar x={14} />
      <TrainCar x={341} />
      <TrainCar x={668} front />
    </svg>
  );
}

function BusWheel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 132)`}>
      <circle r="22" fill="#16242c" />
      <circle r="17" fill="#2e3940" />
      <circle r="11.5" fill="#a1adb4" />
      <circle r="5" fill="#687881" />
      {[0, 60, 120].map((angle) => <path key={angle} d="M-8 0 H8" transform={`rotate(${angle})`} stroke="#53636d" strokeWidth="2" />)}
      <circle r="2.5" fill="#cbd3d7" />
    </g>
  );
}

/** Brand illustration: a generic blue city bus, with no destination or service number. */
export function BusIllustration({ className = "h-auto w-full" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 180" className={className} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <path d="M29 28 H344 Q365 28 370 45 L379 84 V126 Q379 134 371 134 H22 Q15 134 15 127 V45 Q15 28 29 28Z" fill="#086eae" stroke="#34586d" strokeWidth="1.3" />
      <path d="M29 30 H344 Q356 30 362 39 H18 Q20 30 29 30Z" fill="#3b8fbe" />
      <path d="M17 108 H377 V126 Q377 132 370 132 H23 Q17 132 17 126Z" fill="#075a92" />
      <path d="M26 43 H348 L362 84 H26Z" fill="#1e343f" />
      {[34, 88, 142, 196, 250].map((x) => (
        <g key={x}>
          <rect x={x} y="47" width="47" height="34" rx="1" fill="#304f5e" />
          <path d={`M${x + 2} 49 H${x + 45} V55 L${x + 2} 71Z`} fill="#4f6d79" />
          <path d={`M${x + 23} 48 V80`} stroke="#263d48" strokeWidth="1" />
        </g>
      ))}
      <path d="M306 46 H347 L358 81 H306Z" fill="#3b5866" />
      <path d="M310 48 H341 L348 62 L310 73Z" fill="#64818d" />
      <path d="M352 44 L365 48 L373 83 H362Z" fill="#182f3c" />
      <path d="M366 75 L361 56" stroke="#8497a1" strokeWidth="1" />
      <path d="M25 87 H359" stroke="#83b4cf" strokeWidth="1" />
      <path d="M27 97 H320" stroke="#0b5c91" strokeWidth="1" />
      <path d="M325 46 H347 L364 85 V131 H325Z" fill="#233d4b" stroke="#527b91" strokeWidth="1" />
      <path d="M344 46 V131" stroke="#8095a0" strokeWidth="1.2" />
      <path d="M329 50 H340 V114 H329Z M348 57 L359 86 V114 H348Z" fill="#4e6a78" />
      <path d="M328 125 H361" stroke="#a7b5bc" strokeWidth="2" />
      <path d="M319 131 H365" stroke="#102d3e" strokeWidth="3" />
      <path d="M28 112 H57 M28 116 H57 M28 120 H57" stroke="#5393b8" strokeWidth="1" />
      <path d="M180 95 V127 M244 95 V127" stroke="#0a5d91" strokeWidth="1" />
      <rect x="21" y="94" width="4" height="10" rx="1" fill="#a64543" />
      <rect x="369" y="104" width="7" height="8" rx="1" fill="#e8e2c2" />
      <path d="M18 128 H63 M113 128 H266 M318 128 H377" stroke="#193b51" strokeWidth="3" />
      <path d="M65 132 A25 25 0 0 1 115 132 M267 132 A25 25 0 0 1 317 132" fill="#172d3a" stroke="#3980a7" strokeWidth="2" />
      <BusWheel x={90} />
      <BusWheel x={292} />
      <path d="M362 53 H387 V73" fill="none" stroke="#253f4e" strokeWidth="2.5" />
      <rect x="382" y="65" width="7" height="15" rx="2" fill="#283e49" />
      <path d="M19 55 H11 V72" fill="none" stroke="#253f4e" strokeWidth="2" />
      <rect x="8" y="64" width="6" height="12" rx="2" fill="#283e49" />
    </svg>
  );
}
