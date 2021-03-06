import React from "react";
import styled, { css } from "styled-components";
import { ComponentUtilProps } from "../../lib/types";
import { switchCase } from "../../lib/fp";

export enum Variant {
  UP = "up",
  RIGHT = "right",
  DOWN = "down",
  LEFT = "left",
}

const switchRotation = switchCase({
  [Variant.UP]: css`
    transform: rotate(-90deg);
  `,
  [Variant.RIGHT]: css`
    transform: rotate(0deg);
  `,
  [Variant.DOWN]: css`
    transform: rotate(90deg);
  `,
  [Variant.LEFT]: css`
    transform: rotate(180deg);
  `,
})(css`
  transform: rotate(0deg);
`);

const Rotate = styled.div<{ variant: Variant }>`
  display: flex;
  ${({ variant }) => switchRotation(variant)};
`;

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="50"
    height="50"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <rect x="3.5" y="3.5" width="193" height="193" rx="96.5" stroke="white" />
      <path
        d="M78 157L134.567 100.92C135.357 100.138 135.357 98.8621 134.567 98.0797L78 42"
        stroke="white"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="200" height="200" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const StyledArrow = styled(ArrowRight)`
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: transform cubic-bezier(0.65, 0.05, 0.36, 1) 200ms;

  & g {
    clip-path: url(#clip0);
    rect {
      stroke-width: 7;
    }
    path {
      stroke-width: 7;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }
  
  &:hover {
    transform: scale(1.3);
    fill: ${({ theme }) => theme.colors.text};

    g {
      rect {
        stroke: none;
      }
      path {
        stroke: ${({ theme }) => theme.colors.background};
      }
    }
  }
`;

type AnimatedArrowSVGProps = ComponentUtilProps & {
  variant: Variant;
};

export const AnimatedArrowSVG = ({ variant }: AnimatedArrowSVGProps) => (
  <Rotate variant={variant}>
    <StyledArrow />
  </Rotate>
);
