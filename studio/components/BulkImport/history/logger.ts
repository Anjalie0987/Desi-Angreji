import { SanityClient } from 'sanity';

interface TimelineEvent {
  time: string;
  description: string;
}

interface ErrorRecord {
  row: number;
  title: string;
  reason: string;
}

export class ImportLogger {
  private client: SanityClient;
  private fileName: string;
  private fileType: string;
  private importedBy: string;
  private timeline: TimelineEvent[] = [];
  private errors: ErrorRecord[] = [];
  private startTime: number;

  constructor(client: SanityClient, fileName: string, importedBy: string = 'System') {
    this.client = client;
    this.fileName = fileName;
    this.fileType = fileName.split('.').pop()?.toUpperCase() || 'UNKNOWN';
    this.importedBy = importedBy;
    this.startTime = Date.now();
  }

  logEvent(description: string) {
    this.timeline.push({
      time: new Date().toISOString(),
      description,
    });
  }

  logError(row: number, title: string, reason: string) {
    this.errors.push({ row, title, reason });
  }

  async save(stats: {
    totalRows: number;
    importedSuccessfully: number;
    failed: number;
    skipped: number;
    duplicateStories: number;
    publishingMode: string;
  }) {
    this.logEvent('Import Completed');
    const importDuration = Date.now() - this.startTime;

    let status = 'Success';
    if (stats.failed > 0 || this.errors.length > 0) {
      status = stats.importedSuccessfully > 0 ? 'Partial Success' : 'Failed';
    }

    try {
      await this.client.create({
        _type: 'importHistory',
        fileName: this.fileName,
        fileType: this.fileType,
        importedBy: this.importedBy,
        importDate: new Date().toISOString(),
        status,
        publishingMode: stats.publishingMode,
        importDuration,
        totalRows: stats.totalRows,
        importedSuccessfully: stats.importedSuccessfully,
        failed: stats.failed,
        skipped: stats.skipped,
        duplicateStories: stats.duplicateStories,
        timeline: this.timeline.map(e => ({
          _key: crypto.randomUUID(),
          time: e.time,
          description: e.description,
        })),
        errorLog: this.errors.map(e => ({
          _key: crypto.randomUUID(),
          row: e.row,
          title: e.title,
          reason: e.reason,
        })),
      });
    } catch (err) {
      console.error('Failed to save import history', err);
    }
  }
}
