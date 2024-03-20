import { SVGProps } from "react";

export type PolygonalCircleBaseProps = {
    theta?: number;
    clockwise?: boolean;
    idealStepSize?: number;
};

export type PolygonalCircleProps ={
    r?: number;
    cx?: number;
    cy?: number;
} & PolygonalCircleBaseProps & Omit<SVGProps<SVGCircleElement>, 'r' | "cx" | "cy">;

export function createCirclePath(props: PolygonalCircleProps) {
    const { cx = 0, cy = 0, r = 10 } = props;
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx} ${cy + r} A ${r} ${r} 0 1 0 ${cx} ${cy - r} Z`;
}
