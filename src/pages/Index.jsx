import React, { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Index() {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], color: "black", width: 2 }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setLines([]);
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>
        <h1 className="text-3xl text-center">Drawing Canvas</h1>
        <p className="text-center">
          Use the canvas below to draw. You can change colors and brush sizes.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Stage
          width={800}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
          className="border"
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.width}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
        <div className="flex gap-2">
          <Button onClick={handleClear}>Clear Canvas</Button>
          <Button onClick={handleUndo}>Undo Last Action</Button>
        </div>
      </div>
    </main>
  );
}

export default Index;