export function CircuitAnimation() {
  return (
    <svg
      aria-hidden="true"
      className="circuit-animation absolute inset-0 h-full w-full"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1600 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="circuit-surface" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#010c1d" />
          <stop offset="0.5" stopColor="#062143" />
          <stop offset="1" stopColor="#010915" />
        </linearGradient>
        <linearGradient id="circuit-trace" x1="0" x2="1">
          <stop stopColor="#1269e8" />
          <stop offset="0.45" stopColor="#4be8ff" />
          <stop offset="1" stopColor="#1767e5" />
        </linearGradient>
        <radialGradient id="circuit-glow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#116ca7" stopOpacity="0.55" />
          <stop offset="1" stopColor="#031126" stopOpacity="0" />
        </radialGradient>
        <filter id="circuit-blur">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <pattern id="circuit-grid" height="72" patternUnits="userSpaceOnUse" width="72">
          <path d="M72 0H0V72" fill="none" stroke="#238cff" strokeOpacity="0.12" />
        </pattern>
        <g id="circuit-gear">
          <g fill="#38dff5" stroke="#a0f7ff" strokeWidth="2">
            <rect height="18" rx="3" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(30)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(60)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(90)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(120)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(150)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(180)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(210)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(240)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(270)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(300)" width="10" x="-5" y="-47" />
            <rect height="18" rx="3" transform="rotate(330)" width="10" x="-5" y="-47" />
          </g>
          <circle cx="0" cy="0" fill="#075078" r="34" stroke="#78efff" strokeWidth="3" />
          <circle cx="0" cy="0" fill="#031429" r="13" stroke="#b2f9ff" strokeWidth="3" />
          <circle cx="0" cy="0" fill="#79f4ff" r="3" />
        </g>
      </defs>

      <rect fill="url(#circuit-surface)" height="900" width="1600" />
      <rect fill="url(#circuit-grid)" height="900" opacity="0.55" width="1600" />
      <ellipse
        className="circuit-ambient-glow"
        cx="820"
        cy="450"
        fill="url(#circuit-glow)"
        rx="720"
        ry="360"
      />

      <g
        className="circuit-layer circuit-layer--far"
        fill="none"
        stroke="#1c70d9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M-80 116H252l72 72h240l74-74h326l83 83h280l84-84h246"
          strokeOpacity="0.46"
          strokeWidth="5"
        />
        <path
          d="M-72 194h252l94 94h248l90 90h238l104-104h285l78 78h344"
          strokeOpacity="0.34"
          strokeWidth="3"
        />
        <path
          d="M-32 742h245l104-104h276l90 90h224l115-115h296l76 76h244"
          strokeOpacity="0.42"
          strokeWidth="4"
        />
        <path
          d="M30 825h196l112-112h272l102 102h186l98-98h282l88 88h276"
          strokeOpacity="0.28"
          strokeWidth="3"
        />
        <path
          d="M60 410h176l80-80h206l78 78h192l102-102h238l86 86h312"
          strokeOpacity="0.22"
          strokeWidth="2"
        />
      </g>

      <g
        className="circuit-layer circuit-layer--mid"
        fill="none"
        stroke="url(#circuit-trace)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-78 282h286l80 80h286l122-122h250l102 102h274l94-94h226" strokeWidth="8" />
        <path d="M-42 550h238l111-111h290l84 84h294l112-112h258l99 99h216" strokeWidth="6" />
        <path d="M-20 674h290l86-86h225l116 116h264l96-96h274l116 116h190" strokeWidth="7" />
        <path
          d="M16 60h244l84 84h207l101 101h270l84-84h205l100 100h257"
          strokeOpacity="0.72"
          strokeWidth="4"
        />
        <path
          d="M-36 862h292l91-91h235l100 100h296l84-84h220l111 111h257"
          strokeOpacity="0.7"
          strokeWidth="4"
        />
      </g>

      <g
        className="circuit-layer circuit-layer--near"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M-40 342h223l86 86h194l116-116h232l84 84h268l100-100h374"
          stroke="#46eaff"
          strokeOpacity="0.5"
          strokeWidth="3"
        />
        <path
          d="M-20 598h238l72-72h232l108 108h252l84-84h218l110 110h258"
          stroke="#7eefff"
          strokeOpacity="0.35"
          strokeWidth="3"
        />
        <path
          d="M88 0v122l92 92v148l86 86v144l96 96v212"
          stroke="#398aff"
          strokeOpacity="0.28"
          strokeWidth="3"
        />
        <path
          d="M1504 0v128l-88 88v180l-96 96v148l-88 88v172"
          stroke="#398aff"
          strokeOpacity="0.32"
          strokeWidth="3"
        />
      </g>

      <g className="circuit-nodes" fill="#8af5ff">
        <circle cx="288" cy="362" r="6" />
        <circle cx="696" cy="240" r="5" />
        <circle cx="1048" cy="342" r="6" />
        <circle cx="307" cy="439" r="5" />
        <circle cx="1077" cy="411" r="6" />
        <circle cx="270" cy="674" r="6" />
        <circle cx="961" cy="704" r="5" />
      </g>
      <g className="circuit-sparks" fill="#81f4ff">
        <circle cx="405" cy="202" r="4" />
        <circle cx="885" cy="498" r="5" />
        <circle cx="1190" cy="624" r="4" />
        <circle cx="1434" cy="250" r="4" />
        <circle cx="188" cy="726" r="5" />
      </g>
      <g transform="translate(288 362) scale(1.15)">
        <g className="circuit-gear-track circuit-gear-track--right">
          <use className="circuit-gear circuit-gear--one" href="#circuit-gear" />
        </g>
      </g>
      <g transform="translate(696 240) scale(0.96)">
        <g className="circuit-gear-track circuit-gear-track--right">
          <use className="circuit-gear circuit-gear--two" href="#circuit-gear" />
        </g>
      </g>
      <g transform="translate(1048 342) scale(1.1)">
        <g className="circuit-gear-track circuit-gear-track--left">
          <use className="circuit-gear circuit-gear--three" href="#circuit-gear" />
        </g>
      </g>
      <g transform="translate(961 704) scale(0.9)">
        <g className="circuit-gear-track circuit-gear-track--left">
          <use className="circuit-gear circuit-gear--four" href="#circuit-gear" />
        </g>
      </g>
      <g transform="translate(418 620) scale(1.02)">
        <g className="circuit-gear-track circuit-gear-track--right">
          <use className="circuit-gear circuit-gear--five" href="#circuit-gear" />
        </g>
      </g>
      <g transform="translate(1240 520) scale(0.98)">
        <g className="circuit-gear-track circuit-gear-track--left">
          <use className="circuit-gear circuit-gear--six" href="#circuit-gear" />
        </g>
      </g>
      <g className="circuit-bloom" filter="url(#circuit-blur)" opacity="0.75">
        <circle cx="288" cy="362" fill="#44eaff" r="18" />
        <circle cx="1048" cy="342" fill="#44eaff" r="18" />
        <circle cx="961" cy="704" fill="#44eaff" r="16" />
      </g>
    </svg>
  )
}
