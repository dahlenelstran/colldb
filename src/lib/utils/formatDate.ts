export function formatDate(dateString: string | Date | null | undefined): string {
    if (!dateString) return "";
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}