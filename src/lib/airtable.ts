const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

export async function fetchAirtableData(tableId: string) {
    if (!AIRTABLE_PAT || !BASE_ID) {
        console.error("Missing Airtable env vars", {
            hasPat: Boolean(AIRTABLE_PAT),
            hasBaseId: Boolean(BASE_ID),
            tableId,
        });
        return [];
    }

    const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    let response: Response;
    try {
        response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_PAT}`,
            },
            cache: "no-store",
            signal: controller.signal,
        });
    } catch (error) {
        console.error(`Failed to fetch Airtable table ${tableId}:`, error);
        return [];
    } finally {
        clearTimeout(timeout);
    }

    if (!response.ok) {
        // Log verification error but don't crash app if optional data fails?
        // For now, let's just log and return empty to result in graceful fallback
        console.error(`Failed to fetch Airtable table ${tableId}: ${response.statusText}`);
        return [];
    }

    const data = await response.json();
    return data.records;
}

export async function getSiteContent() {
    // Prefer Airtable table IDs to avoid table-name drift.
    const mainPromise = fetchAirtableData("tbl0QHHqLlFfBX06k");
    const funFactsPromise = fetchAirtableData("tbljzsE6JcN6ECNzt");
    const tryAskingPromise = fetchAirtableData("tbl6kh5L0QWxJoXzb");

    const [mainResult, funFactsResult, tryAskingResult] = await Promise.allSettled([
        mainPromise,
        funFactsPromise,
        tryAskingPromise
    ]);

    // Helper to get value or empty array
    const getRecords = (result: PromiseSettledResult<any[]>) =>
        result.status === 'fulfilled' ? result.value : [];

    const mainRecords = getRecords(mainResult);
    const funFactsRecords = getRecords(funFactsResult);
    const tryAskingRecords = getRecords(tryAskingResult);

    // Log errors if any
    if (mainResult.status === 'rejected') console.error("Main table failed:", mainResult.reason);
    if (funFactsResult.status === 'rejected') console.error("Fun Facts failed:", funFactsResult.reason);
    if (tryAskingResult.status === 'rejected') console.error("Try Asking failed:", tryAskingResult.reason);

    const main = mainRecords.reduce((acc: any, record: any) => {
        if (record.fields.Name && record.fields.Title) {
            acc[record.fields.Name] = record.fields.Title;
        }
        return acc;
    }, {});

    const funFacts = funFactsRecords
        .map((record: any) => record.fields.Name)
        .filter(Boolean); // Filter out undefined/null names

    const starterChips = tryAskingRecords
        .map((record: any) => record.fields.Name)
        .filter(Boolean);

    return {
        headline: main.Main,
        pitch: main.body2,
        askHeadline: main.Ask,
        funFacts,
        starterChips,
    };
}
