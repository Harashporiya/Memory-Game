import './style/scoreBord.css'
export function ScoreBord({ score, bestScore }) {
  return (
    <div id="score">
      <div>Score: {score}</div>
      <div>Best Score: {bestScore}</div>
    </div>
  );
}
