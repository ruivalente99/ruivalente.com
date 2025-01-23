"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
}

export function CommitSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const gridSize = 8;
  const cellSize = 8;
  const gap = 2;
  const gameSpeed = 200;
  const restartDelay = 2000;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let commits: Point[] = [];
    let snake: Point[] = [{ x: 0, y: 0 }];
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let gameLoop: number;

    function initializeGame() {
      commits = [];
      snake = [{ x: 0, y: 0 }];
      direction = { x: 1, y: 0 };
      nextDirection = { x: 1, y: 0 };

      // Generate fewer random commits
      for (let i = 0; i < 10; i++) {
        commits.push({
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        });
      }
    }

    function findNearestCommit(head: Point): Point | null {
      if (commits.length === 0) return null;
      
      let nearest = commits[0];
      let minDistance = Number.MAX_VALUE;
      
      commits.forEach(commit => {
        const distance = Math.abs(commit.x - head.x) + Math.abs(commit.y - head.y);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = commit;
        }
      });
      
      return nearest;
    }

    function calculateNextDirection(head: Point, target: Point): { x: number; y: number } {
      // Prioritize horizontal movement
      if (head.x !== target.x) {
        return { x: head.x < target.x ? 1 : -1, y: 0 };
      }
      // Then vertical movement
      if (head.y !== target.y) {
        return { x: 0, y: head.y < target.y ? 1 : -1 };
      }
      return direction;
    }

    function checkCollision(head: Point): boolean {
      return snake.slice(1).some(segment => 
        segment.x === head.x && segment.y === head.y
      );
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw commits
      ctx.fillStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      commits.forEach((commit) => {
        ctx.fillRect(
          commit.x * (cellSize + gap),
          commit.y * (cellSize + gap),
          cellSize,
          cellSize
        );
      });

      // Draw snake
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (theme === 'dark') {
        gradient.addColorStop(0, '#bd93f9');
        gradient.addColorStop(1, '#ff79c6');
      } else {
        gradient.addColorStop(0, '#454545');
        gradient.addColorStop(1, '#666666');
      }
      
      ctx.fillStyle = gradient;
      snake.forEach((segment) => {
        ctx.fillRect(
          segment.x * (cellSize + gap),
          segment.y * (cellSize + gap),
          cellSize,
          cellSize
        );
      });

      // Draw game state message
      if (gameState !== 'playing') {
        ctx.fillStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        const message = gameState === 'won' ? "All commits eaten!" : "Game Over!";
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
        ctx.font = "10px monospace";
        ctx.fillText("Restarting...", canvas.width / 2, canvas.height / 2 + 16);
      }
    }

    function update() {
      if (gameState !== 'playing') return;

      const head = snake[0];
      const nearest = findNearestCommit(head);
      
      if (nearest) {
        nextDirection = calculateNextDirection(head, nearest);
      }
      
      direction = nextDirection;
      const newHead = { ...head };
      newHead.x += direction.x;
      newHead.y += direction.y;

      // Wrap around edges
      if (newHead.x >= gridSize) newHead.x = 0;
      if (newHead.x < 0) newHead.x = gridSize - 1;
      if (newHead.y >= gridSize) newHead.y = 0;
      if (newHead.y < 0) newHead.y = gridSize - 1;

      // Check for collision with self
      if (checkCollision(newHead)) {
        setGameState('lost');
        setTimeout(() => {
          initializeGame();
          setGameState('playing');
        }, restartDelay);
        return;
      }

      snake.unshift(newHead);

      // Check for commit collection
      const commitIndex = commits.findIndex(
        (commit) => commit.x === newHead.x && commit.y === newHead.y
      );
      if (commitIndex === -1) {
        snake.pop();
      } else {
        commits.splice(commitIndex, 1);
        if (commits.length === 0) {
          setGameState('won');
          setTimeout(() => {
            initializeGame();
            setGameState('playing');
          }, restartDelay);
        }
      }
    }

    initializeGame();
    gameLoop = window.setInterval(() => {
      update();
      draw();
    }, gameSpeed);

    return () => {
      clearInterval(gameLoop);
    };
  }, [theme, gameState]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        width={gridSize * (cellSize + gap)}
        height={gridSize * (cellSize + gap)}
        className="w-full h-full"
      />
    </motion.div>
  );
}