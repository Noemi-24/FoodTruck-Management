export const getStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";

    switch (status) {
        case "PENDING":
            return `${base} bg-yellow-100 text-yellow-700`;

        case "IN_PREPARATION":
            return `${base} bg-blue-100 text-blue-700`;

        case "READY":
            return `${base} bg-purple-100 text-purple-700`;

        case "COMPLETED":
            return `${base} bg-green-100 text-green-700`;

        case "CANCELLED":
            return `${base} bg-red-100 text-red-700`;

        default:
            return `${base} bg-gray-100 text-gray-700`;
    }
};