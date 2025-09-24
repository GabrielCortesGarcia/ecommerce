"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "./utils";

// Theme config
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

function ChartContainerImpl({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div data-slot="chart" data-chart={chartId} className={cn(className)} {...props}>
        <ChartStyleImpl id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children ? <React.Fragment>{children}</React.Fragment> : <React.Fragment />}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyleImpl = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, cfg]) => {
    const color = cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color;
    return color ? `--color-${key}: ${color};` : null;
  })
  .join("\n")}
}
` )
          .join("\n"),
      }}
    />
  );
};

// ------------------- Tooltip Types -------------------

// Item que realmente llega al tooltip
export type TooltipItem<ValueType = number | string, NameType = string> = {
  value: ValueType;
  name?: NameType;
  dataKey?: string;
  color?: string;
  payload?: Record<string, unknown>;
};

export type ChartTooltipContentProps<ValueType = number | string, NameType = string> = {
  active?: boolean;
  payload?: TooltipItem<ValueType, NameType>[];
  label?: NameType;
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelFormatter?: (label: NameType, payload?: TooltipItem<ValueType, NameType>[]) => React.ReactNode;
  labelClassName?: string;
  formatter?: (
    value: ValueType,
    name: NameType | undefined,
    entry: TooltipItem<ValueType, NameType>,
    index: number
  ) => React.ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
};

export function ChartTooltipContent<ValueType = number | string, NameType = string>({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps<ValueType, NameType>) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload ?? [];
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = item ? getPayloadConfigFromPayload(config, item, key) : undefined;
    const value = !labelKey && typeof label === "string" ? config[label as keyof typeof config]?.label || label : itemConfig?.label;

    if (labelFormatter) return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value as NameType, payload)}</div>;
    if (!value) return null;
    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div className={cn("border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div key={item.dataKey || index} className={cn("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", indicator === "dot" && "items-center")}>
              {formatter && item?.value !== undefined ? formatter(item.value, item.name, item, index) : (
                <>
                  {itemConfig?.icon ? <itemConfig.icon /> : !hideIndicator && <div className={cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", { "h-2.5 w-2.5": indicator === "dot", "w-1": indicator === "line", "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed", "my-0.5": nestLabel && indicator === "dashed" })} style={{ "--color-bg": indicatorColor, "--color-border": indicatorColor } as React.CSSProperties} />}
                  <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {typeof itemConfig?.label === "string" || typeof itemConfig?.label === "number"
                          ? itemConfig?.label
                          : typeof item.name === "string" || typeof item.name === "number"
                          ? item.name
                          : String(itemConfig?.label || item.name)}
                      </span>
                    </div>
                    {item.value && <span className="text-foreground font-mono font-medium tabular-nums">{item.value.toLocaleString()}</span>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------- Legend -------------------
export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  payload?: { value: string | number; dataKey?: string; color?: string }[];
  hideIcon?: boolean;
  nameKey?: string;
  verticalAlign?: "top" | "bottom" | "left" | "right";
}) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
      {payload.map((item, index) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div key={item.value || index} className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3">
            {itemConfig?.icon && !hideIcon ? <itemConfig.icon /> : <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// ------------------- Helper -------------------
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: TooltipItem | { [key: string]: unknown },
  key: string
) {
  if (!payload || typeof payload !== "object") return undefined;

  const payloadObj: Record<string, unknown> | undefined =
    payload.payload && typeof payload.payload === "object"
      ? (payload.payload as Record<string, unknown>)
      : undefined;
  let configLabelKey = key;

  if (key in payload && typeof (payload as Record<string, unknown>)[key] === "string") configLabelKey = (payload as Record<string, unknown>)[key] as string;
  else if (payloadObj && key in payloadObj && typeof payloadObj[key] === "string") configLabelKey = payloadObj[key] as string;

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

// ------------------- Export -------------------
export const ChartTooltip = RechartsPrimitive.Tooltip;
export const ChartContainer = ChartContainerImpl;
export const ChartStyle = ChartStyleImpl;
export const ChartLegend = RechartsPrimitive.Legend;
export const ChartTooltipContentComponent = ChartTooltipContent;
export const ChartLegendContentComponent = ChartLegendContent;
