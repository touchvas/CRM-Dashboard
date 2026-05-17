/**
 * dummy-data-backup.js
 * Backup of the original dummy data and synthetic generation logic.
 */

window.segmentationDummyBackup = {
    generateSyntheticTrends: (data) => {
        const months = ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'];
        return months.map((m, i) => {
            const factor = 0.8 + (i * 0.1);
            const stake = Math.round(((data.total_bets || 80000) / 6) * factor);
            return {
                month: m,
                players: Math.round((data.total_players || 10) * factor),
                active_players: Math.round((data.total_players || 10) * factor * 0.8),
                total_ggr: Math.round(stake * 0.15), // Mock 15% margin
                withdrawals: Math.round(((data.total_withdrawals || 20000) / 6) * factor)
            };
        });
    }
};
