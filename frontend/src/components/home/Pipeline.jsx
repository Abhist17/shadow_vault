const NODES = [
  { x: 70, name: "Deposit", tech: "Stellar" },
  { x: 285, name: "Commitment", tech: "Poseidon2" },
  { x: 500, name: "Proof", tech: "Noir" },
  { x: 715, name: "Verify", tech: "Soroban" },
  { x: 930, name: "Withdraw", tech: "Nullifier" },
];

const RAIL_Y = 74;
const PATH = `M${NODES[0].x},${RAIL_Y} L${NODES[NODES.length - 1].x},${RAIL_Y}`;

/**
 * The five stages drawn as a single rail with a packet travelling along it.
 *
 * Desktop only — at phone widths the labels would render at a few pixels, so
 * the stage table below carries the same information instead of this shrinking
 * into illegibility.
 */
export default function Pipeline() {
  return (
    <svg
      className="pipe"
      viewBox="0 0 1000 130"
      role="img"
      aria-label="Deposit, commitment, proof, verification and withdrawal, in sequence"
    >
      <line
        x1={NODES[0].x}
        y1={RAIL_Y}
        x2={NODES[NODES.length - 1].x}
        y2={RAIL_Y}
        className="pipe-rail"
      />

      {/* Flow dashes: one long animation of dashoffset reads as movement along
          the rail without any per-frame JS. */}
      <line
        x1={NODES[0].x}
        y1={RAIL_Y}
        x2={NODES[NODES.length - 1].x}
        y2={RAIL_Y}
        className="pipe-flow"
      />

      {NODES.map((node) => (
        <g key={node.name} className="pipe-node">
          <text x={node.x} y={RAIL_Y - 30} className="pipe-name">
            {node.name}
          </text>

          <circle cx={node.x} cy={RAIL_Y} r="11" className="pipe-ring" />
          <circle cx={node.x} cy={RAIL_Y} r="3.5" className="pipe-dot" />

          <text x={node.x} y={RAIL_Y + 40} className="pipe-tech">
            {node.tech}
          </text>
        </g>
      ))}

      <circle r="4" className="pipe-packet">
        <animateMotion dur="5s" repeatCount="indefinite" path={PATH} />
      </circle>
    </svg>
  );
}
