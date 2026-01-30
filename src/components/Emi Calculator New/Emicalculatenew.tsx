import * as React from "react";
import { BriefcaseBusiness, Car, GraduationCap, User } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


type LoanType = "personal" | "education" | "business" | "vehicle";

const loanTypes: Array<{ id: LoanType; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { id: "personal", label: "Personal Loan", Icon: User },
    { id: "education", label: "Educational Loan", Icon: GraduationCap },
    { id: "business", label: "Business Loan", Icon: BriefcaseBusiness },
    { id: "vehicle", label: "Vehicle Loan", Icon: Car },
];

function roundTo(n: number, step: number) {
    if (!Number.isFinite(n) || !Number.isFinite(step) || step <= 0) return n;
    return Math.round(n / step) * step;
}
export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function formatINR(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}

export function calculateEmi(
    principal: number,
    annualRate: number,
    tenureMonths: number
) {
    const monthlyRate = annualRate / 12 / 100;

    const emi =
        monthlyRate === 0
            ? principal / tenureMonths
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
            (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;

    return {
        emi,
        totalInterest,
        totalPayment,
    };
}


function SliderField(props: {
    label: string;
    valueLabel: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
}) {
    const { label, valueLabel, value, min, max, step, onChange } = props;
    return (
        <div className="space-y-3">
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">Drag to adjust</div>
                </div>
                <div
                    className="
    rounded-lg
    p-[1.5px]
    bg-[linear-gradient(135deg,#2563EB,#995CF5)]
    shadow-elev
  "
                >
                    <div
                        className="
      rounded-lg
      bg-[#0f1222]
      px-3 py-2
      text-sm
      tabular-nums
      text-white
    "
                    >
                        {valueLabel}
                    </div>
                </div>

            </div>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={step}
                onValueChange={(v) => onChange(v?.[0] ?? value)} className={undefined} defaultValue={undefined} />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{min.toLocaleString("en-IN")}</span>
                <span>{max.toLocaleString("en-IN")}</span>
            </div>
        </div>
    );
}

function LoanTypeGrid({ value, onChange }: { value: LoanType; onChange: (v: LoanType) => void }) {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {loanTypes.map(({ id, label, Icon }) => {
                const active = id === value;

                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => onChange(id)}
                        aria-pressed={active}
                        className={cn(
                            "group relative flex items-center justify-center gap-3 rounded-xl px-4 py-4 text-center transition-all",

                            // CARD BASE
                            "bg-[#0f1222]",
                            "border border-[#2563EB]/40",
                            "shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_10px_28px_rgba(0,0,0,0.55)]",

                            // HOVER
                            "hover:-translate-y-0.5 hover:border-[#995CF5]/60 hover:shadow-[0_0_0_1px_rgba(153,92,245,0.45),0_14px_36px_rgba(0,0,0,0.6)]",

                            // FOCUS
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/60",

                            // ACTIVE
                            active &&
                            "border-[#995CF5] shadow-[0_0_0_1px_rgba(153,92,245,0.55),0_14px_36px_rgba(0,0,0,0.65)]"
                        )}
                    >
                        {/* ICON */}
                        <span
                            className={cn(
                                "grid h-10 w-10 place-items-center rounded-lg transition-transform",
                                "bg-white/5 text-white",
                                active ? "scale-[1.05]" : "group-hover:scale-[1.05]"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </span>

                        {/* LABEL */}
                        <span className="text-sm font-medium text-white leading-snug">
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>


    );
}
function BreakdownChart({ principal, interest }) {
    const data = React.useMemo(
        () => [
            {
                name: "Principal",
                value: Math.max(0, principal),
                fill: "#2563EB", // Tailwind blue-600
            },
            {
                name: "Interest",
                value: Math.max(0, interest),
                fill: "#995CF5", // Violet (unchanged)
            },
        ],
        [principal, interest]
    );

    return (
        <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        innerRadius={52}
                        outerRadius={72}
                        stroke="transparent"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}



function buildSchedule(principal: number, annualRatePct: number, months: number) {
    const rows: Array<{ month: number; emi: number; interest: number; principal: number; balance: number }> = [];
    const n = Math.max(1, Math.round(months));
    const r = Math.max(0, annualRatePct) / 12 / 100;
    const { emi } = calculateEmi(principal, annualRatePct, n);

    let balance = principal;

    for (let m = 1; m <= n; m++) {
        const interest = r === 0 ? 0 : balance * r;
        const principalPaid = Math.min(balance, emi - interest);
        balance = Math.max(0, balance - principalPaid);
        rows.push({ month: m, emi, interest, principal: principalPaid, balance });
    }
    return rows;
}

export function Emicalculatornew() {
    const [loanType, setLoanType] = React.useState<LoanType>("personal");
    const [principal, setPrincipal] = React.useState(300000);
    const [rate, setRate] = React.useState(13);
    const [tenureYears, setTenureYears] = React.useState(5);
    const [showAll, setShowAll] = React.useState(false);

    // Light “smart defaults” by loan type (kept subtle)
    React.useEffect(() => {
        if (loanType === "education") {
            setRate((r) => clamp(r, 7, 14));
        }
        if (loanType === "vehicle") {
            setTenureYears((y) => clamp(y, 1, 7));
        }
    }, [loanType]);

    const tenureMonths = Math.round(tenureYears * 12);
    const result = React.useMemo(
        () => calculateEmi(principal, rate, tenureMonths),
        [principal, rate, tenureMonths]
    );


    const schedule = React.useMemo(() => buildSchedule(principal, rate, tenureMonths), [principal, rate, tenureMonths]);

    const summaryItems = [
        { label: "Monthly EMI", value: formatINR(result.emi) },
        { label: "Principal amount", value: formatINR(principal) },
        { label: "Total interest", value: formatINR(result.totalInterest) },
        { label: "Total amount", value: formatINR(result.totalPayment) },
    ];

    return (
        <section
            className="
    mx-auto w-full max-w-6xl
    px-4 pb-14 pt-10 md:px-6 md:pb-20
    bg-[linear-gradient(135deg,#2e2f7a_0%,#1b1f5e_35%,#0b0f3b_65%,#05071f_100%)]
    rounded-2xl
  "
        >

            <header className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full" />
                    Fintech tools  instant estimates
                </div>
                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl text-white">
                    EMI Calculator
                </h1>

                <p className="mt-3 max-w-2xl text-pretty text-[#cbd5f5]">

                    Tune amount, rate, and tenure—get a clear monthly EMI and an interest breakdown in seconds.
                </p>
            </header>
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">

                {/* LEFT – LOAN TYPE */}
                <Card
                    className="
      overflow-hidden
      rounded-2xl
      bg-[#0f1222]
      border border-[#995CF5]/40
      shadow-[0_0_0_1px_rgba(153,92,245,0.35),0_16px_40px_rgba(0,0,0,0.6)]
    "
                >
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl text-white">Loan Type</CardTitle>
                        <CardDescription className="text-white/70">
                            Pick a category to preview typical ranges and terms.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">

                        <LoanTypeGrid value={loanType} onChange={setLoanType} />

                        <div className="grid gap-6">
                            <SliderField
                                label="Loan amount"
                                value={principal}
                                min={50000}
                                max={5000000}
                                step={1000}
                                valueLabel={formatINR(principal)}
                                onChange={(v) => setPrincipal(roundTo(v, 1000))}
                            />

                            <SliderField
                                label="Rate of interest (p.a.)"
                                value={rate}
                                min={1}
                                max={30}
                                step={0.1}
                                valueLabel={`${rate.toFixed(1)} %`}
                                onChange={(v) => setRate(clamp(Number(v.toFixed(1)), 0, 40))}
                            />

                            <SliderField
                                label="Loan tenure"
                                value={tenureYears}
                                min={1}
                                max={30}
                                step={0.5}
                                valueLabel={`${tenureYears.toFixed(1)} Yr (${tenureMonths} mo)`}
                                onChange={(v) => setTenureYears(clamp(Number(v.toFixed(1)), 0.5, 40))}
                            />
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs text-white/60">
                                Tip: use the schedule to see how your balance reduces each month.
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="glow"
                                    onClick={() => {
                                        setPrincipal(300000);
                                        setRate(13);
                                        setTenureYears(5);
                                        setLoanType("personal");
                                        setShowAll(false);
                                    }}
                                    className="
              bg-slate-200
              text-slate-800
              border border-slate-300
              shadow-none
              hover:bg-slate-200
              hover:shadow-none
              active:shadow-none
              focus-visible:ring-0
              transition-none
            "
                                >
                                    Reset
                                </Button>

                                <Button
                                    variant="hero"
                                    onClick={() => setShowAll((s) => !s)}
                                    className="
              bg-blue-600 text-white
              hover:bg-blue-700
              focus:ring-2 focus:ring-blue-500
            "
                                >
                                    {showAll ? "Show less" : "Full schedule"}
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* RIGHT SIDE */}
                <aside className="space-y-6">

                    {/* SUMMARY */}
                    <Card
                        className="
        rounded-2xl
        bg-[#0f1222]
        border border-[#2563EB]/40
        shadow-[0_0_0_1px_rgba(37,99,235,0.35),0_16px_40px_rgba(0,0,0,0.6)]
      "
                    >
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl text-white">Summary</CardTitle>
                            <CardDescription className="text-white/70">
                                Quick view of your estimated repayment.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div className="grid gap-3">
                                {summaryItems.map((it) => (
                                    <div key={it.label} className="flex items-center justify-between gap-4">
                                        <div className="text-sm text-white/70">{it.label}</div>
                                        <div className="text-sm font-semibold text-white tabular-nums">
                                            {it.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-xl bg-[#14172c] border border-white/10 p-4">
                                <div className="mb-2 text-sm font-medium text-white">
                                    Principal vs Interest
                                </div>

                                <BreakdownChart
                                    principal={principal}
                                    interest={result.totalInterest}
                                />

                                <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-white/70">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                                        <span>Principal</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-[#995CF5]" />
                                        <span>Interest</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="hero"
                                className="
    w-full
    rounded-full
    bg-blue-600 text-white
    hover:bg-blue-700
    focus:ring-2 focus:ring-blue-500
  "
                            >
                                Explore loan options
                            </Button>


                        </CardContent>
                    </Card>

                    {/* TABS */}
                    <Tabs
                        defaultValue="schedule"
                        className="
        rounded-2xl
        bg-[#0f1222]
        border border-white/10
        shadow-[0_12px_32px_rgba(0,0,0,0.6)]
      "
                    >
                        <div className="p-4 pb-0">
                            <TabsList
                                className="
      relative
      grid w-full grid-cols-2
      rounded-full
      bg-[#1a1e2e]
      p-1
      shadow-inner
    "
                            >
                                <TabsTrigger
                                    value="schedule"
                                    className="
        rounded-full
        px-4 py-2
        text-sm font-medium
        text-white/70
        transition-all
        data-[state=active]:bg-[#0f1222]
        data-[state=active]:text-white
        data-[state=active]:shadow
      "
                                >
                                    Schedule
                                </TabsTrigger>

                                <TabsTrigger
                                    value="about"
                                    className="
        rounded-full
        px-4 py-2
        text-sm font-medium
        text-white/70
        transition-all
        data-[state=active]:bg-[#0f1222]
        data-[state=active]:text-white
        data-[state=active]:shadow
      "
                                >
                                    About EMI
                                </TabsTrigger>
                            </TabsList>
                        </div>


                        <TabsContent value="schedule" className="p-4 pt-3">
                            <div className="mb-3 text-sm font-medium text-white">
                                Amortization snapshot
                            </div>

                            <div className="max-h-[340px] overflow-auto rounded-xl border border-white/10 bg-[#14172c]">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-[#14172c]">
                                        <tr className="text-left text-xs text-white/60">
                                            <th className="p-3">Month</th>
                                            <th className="p-3">EMI</th>
                                            <th className="p-3">Interest</th>
                                            <th className="p-3">Principal</th>
                                            <th className="p-3">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(showAll ? schedule : schedule.slice(0, 12)).map((r) => (
                                            <tr key={r.month} className="border-t border-white/10">
                                                <td className="p-3 text-white/60">{r.month}</td>
                                                <td className="p-3 text-white">{formatINR(r.emi)}</td>
                                                <td className="p-3 text-white/60">{formatINR(r.interest)}</td>
                                                <td className="p-3 text-white">{formatINR(r.principal)}</td>
                                                <td className="p-3 text-white/60">{formatINR(r.balance)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>

                        <TabsContent value="about" className="p-4 pt-3">
                            <div className="space-y-3">
                                <div className="text-sm font-medium text-white">What is EMI?</div>
                                <p className="text-sm text-white/70">
                                    EMI (Equated Monthly Installment) is a fixed monthly payment that covers both interest and principal.
                                    Your EMI changes when you tweak amount, rate, or tenure.
                                </p>
                                <div className="rounded-xl border border-border bg-secondary/30 p-3 text-xs  text-white">
                                    <div className="font-medium  text-white">Formula (monthly)</div>
                                    <div className="mt-1 font-mono">EMI = P × r × (1+r)^n / ((1+r)^n − 1)</div>
                                    <div className="mt-2">P = principal • r = monthly interest rate • n = number of months</div>
                                </div>
                                <p className="text-xs  text-white">
                                    Note: This is an estimate. Actual rates and fees may vary by lender and credit profile.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>

                </aside>
            </div>


            <section className="mt-10 grid gap-6 md:grid-cols-3">

                {/* CARD 1 */}
                <Card
                    className="
      rounded-2xl
      bg-[#0f1222]
      border border-[#995CF5]/50
      shadow-[0_0_0_1px_rgba(153,92,245,0.35),0_14px_36px_rgba(0,0,0,0.6)]
    "
                >
                    <CardHeader className={undefined}>
                        <CardTitle className="text-lg text-white">
                            How EMI is calculated
                        </CardTitle>
                        <CardDescription className="text-white/70">
                            Know what’s behind the number.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="text-sm text-white/70">
                        Your monthly EMI is computed using the interest rate per month and the total number of months. Small changes
                        in tenure can reduce EMI but often increase total interest.
                    </CardContent>
                </Card>

                {/* CARD 2 */}
                <Card
                    className="
      rounded-2xl
      bg-[#0f1222]
      border border-[#2563EB]/50
      shadow-[0_0_0_1px_rgba(37,99,235,0.35),0_14px_36px_rgba(0,0,0,0.6)]
    "
                >
                    <CardHeader className={undefined}>
                        <CardTitle className="text-lg text-white">
                            Why this helps
                        </CardTitle>
                        <CardDescription className="text-white/70">
                            Plan with confidence.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="text-sm text-white/70">
                        Compare options quickly: raise the down payment, shorten tenure, or negotiate rate—then see the impact on EMI
                        and total repayment instantly.
                    </CardContent>
                </Card>

                {/* CARD 3 */}
                <Card
                    className="
      rounded-2xl
      bg-[#0f1222]
      border border-[#995CF5]/50
      shadow-[0_0_0_1px_rgba(153,92,245,0.35),0_14px_36px_rgba(0,0,0,0.6)]
    "
                >
                    <CardHeader className={undefined}>
                        <CardTitle className="text-lg text-white">
                            Using the calculator
                        </CardTitle>
                        <CardDescription className="text-white/70">
                            Three steps.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="text-sm text-white/70">
                        1) Choose loan type 2) Set amount, rate & tenure 3) Review EMI + schedule. Use “Full schedule” to see month-by-
                        month payoff.
                    </CardContent>
                </Card>

            </section>

        </section>
    );
}
export default Emicalculatornew;
