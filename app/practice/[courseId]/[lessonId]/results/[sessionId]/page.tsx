import { Suspense } from "react";

import { SessionResults } from "@/features/practice";

async function PracticeResultsContent({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <SessionResults sessionId={sessionId} />;
}

export default function PracticeResultsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading results…</p>}>
      <PracticeResultsContent params={params} />
    </Suspense>
  );
}
