interface AqiEmojiProps {
  level: number;
  size?: number;
}

const AqiEmoji = ({ level, size = 80 }: AqiEmojiProps) => {
  const colors: Record<number, { face: string; bg: string }> = {
    1: { face: "#00E400", bg: "#00E40030" },
    2: { face: "#CCCC00", bg: "#FFFF0030" },
    3: { face: "#FF7E00", bg: "#FF7E0030" },
    4: { face: "#FF0000", bg: "#FF000030" },
    5: { face: "#8F3F97", bg: "#8F3F9730" },
    6: { face: "#7E0023", bg: "#7E002330" },
  };

  const c = colors[level] || colors[1];

  const renderFace = () => {
    switch (level) {
      case 1:
        return (
          <g>
            <circle cx="35" cy="42" r="5" fill={c.face} />
            <circle cx="65" cy="42" r="5" fill={c.face} />
            <path d="M 30 62 Q 50 80 70 62" stroke={c.face} strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        );
      case 2:
        return (
          <g>
            <circle cx="35" cy="42" r="5" fill={c.face} />
            <circle cx="65" cy="42" r="5" fill={c.face} />
            <line x1="32" y1="65" x2="68" y2="65" stroke={c.face} strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      case 3:
        return (
          <g>
            <circle cx="35" cy="42" r="5" fill={c.face} />
            <circle cx="65" cy="42" r="5" fill={c.face} />
            <path d="M 30 68 Q 50 58 70 68" stroke={c.face} strokeWidth="4" fill="none" strokeLinecap="round" />
            <line x1="28" y1="30" x2="42" y2="34" stroke={c.face} strokeWidth="3" strokeLinecap="round" />
            <line x1="72" y1="30" x2="58" y2="34" stroke={c.face} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 4:
        return (
          <g>
            <ellipse cx="35" cy="40" rx="6" ry="7" fill={c.face} />
            <ellipse cx="65" cy="40" rx="6" ry="7" fill={c.face} />
            <path d="M 30 70 Q 50 58 70 70" stroke={c.face} strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="25" y="62" rx="4" width="50" height="16" fill={c.face} opacity="0.3" />
            <line x1="25" y1="70" x2="75" y2="70" stroke={c.face} strokeWidth="2" />
          </g>
        );
      case 5:
        return (
          <g>
            <ellipse cx="35" cy="38" rx="7" ry="9" fill={c.face} />
            <ellipse cx="65" cy="38" rx="7" ry="9" fill={c.face} />
            <circle cx="35" cy="38" r="3" fill={c.bg} />
            <circle cx="65" cy="38" r="3" fill={c.bg} />
            <path d="M 30 72 Q 50 58 70 72" stroke={c.face} strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="22" y="62" rx="5" width="56" height="18" fill={c.face} opacity="0.3" />
            <line x1="22" y1="71" x2="78" y2="71" stroke={c.face} strokeWidth="2" />
            <line x1="38" y1="62" x2="38" y2="80" stroke={c.face} strokeWidth="1.5" opacity="0.5" />
            <line x1="50" y1="62" x2="50" y2="80" stroke={c.face} strokeWidth="1.5" opacity="0.5" />
            <line x1="62" y1="62" x2="62" y2="80" stroke={c.face} strokeWidth="1.5" opacity="0.5" />
          </g>
        );
      case 6:
        return (
          <g>
            <path d="M 28 32 Q 35 26 42 32" stroke={c.face} strokeWidth="3" fill="none" />
            <path d="M 58 32 Q 65 26 72 32" stroke={c.face} strokeWidth="3" fill="none" />
            <ellipse cx="35" cy="40" rx="7" ry="9" fill={c.face} />
            <ellipse cx="65" cy="40" rx="7" ry="9" fill={c.face} />
            <circle cx="35" cy="40" r="3" fill={c.bg} />
            <circle cx="65" cy="40" r="3" fill={c.bg} />
            <ellipse cx="50" cy="72" rx="12" ry="8" fill={c.face} opacity="0.4" />
            <rect x="20" y="60" rx="5" width="60" height="20" fill={c.face} opacity="0.35" />
            <line x1="20" y1="70" x2="80" y2="70" stroke={c.face} strokeWidth="2" />
            <line x1="35" y1="60" x2="35" y2="80" stroke={c.face} strokeWidth="1.5" opacity="0.5" />
            <line x1="50" y1="60" x2="50" y2="80" stroke={c.face} strokeWidth="1.5" opacity="0.5" />
            <line x1="65" y1="60" x2="65" y2="80" stroke={c.face} strokeWidth="1.5" opacity="0.5" />
            <circle cx="24" cy="54" r="4" fill={c.face} opacity="0.3" />
            <circle cx="76" cy="54" r="4" fill={c.face} opacity="0.3" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill={c.bg} stroke={c.face} strokeWidth="3" />
      {renderFace()}
    </svg>
  );
};

export default AqiEmoji;
