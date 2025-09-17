// Interview Session Storage Utilities

import { InterviewSession, InterviewReport, SessionHistory } from '../types/interview';

const STORAGE_KEYS = {
  SESSIONS: 'interview_sessions',
  REPORTS: 'interview_reports',
  HISTORY: 'interview_history',
  SETTINGS: 'interview_settings',
  RECORDINGS: 'interview_recordings'
};

export class InterviewStorageService {
  // Session Management
  static saveSession(session: InterviewSession): void {
    const sessions = this.getSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }

  static getSessions(): InterviewSession[] {
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored).map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined
      }));
    } catch (error) {
      console.error('Error parsing stored sessions:', error);
      return [];
    }
  }

  static getSession(sessionId: string): InterviewSession | null {
    const sessions = this.getSessions();
    return sessions.find(s => s.id === sessionId) || null;
  }

  static deleteSession(sessionId: string): void {
    const sessions = this.getSessions().filter(s => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    
    // Also delete associated report and recordings
    this.deleteReport(sessionId);
    this.deleteRecording(sessionId);
  }

  // Report Management
  static saveReport(report: InterviewReport): void {
    const reports = this.getReports();
    const existingIndex = reports.findIndex(r => r.sessionId === report.sessionId);
    
    if (existingIndex >= 0) {
      reports[existingIndex] = report;
    } else {
      reports.push(report);
    }
    
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }

  static getReports(): InterviewReport[] {
    const stored = localStorage.getItem(STORAGE_KEYS.REPORTS);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored reports:', error);
      return [];
    }
  }

  static getReport(sessionId: string): InterviewReport | null {
    const reports = this.getReports();
    return reports.find(r => r.sessionId === sessionId) || null;
  }

  static deleteReport(sessionId: string): void {
    const reports = this.getReports().filter(r => r.sessionId !== sessionId);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }

  // Recording Management (only if user consented)
  static async saveRecording(sessionId: string, audioBlob: Blob, videoBlob?: Blob): Promise<void> {
    try {
      const recordings = this.getRecordingMetadata();
      
      // Convert blobs to base64 for storage (in real app, would use IndexedDB or server)
      const audioBase64 = await this.blobToBase64(audioBlob);
      const videoBase64 = videoBlob ? await this.blobToBase64(videoBlob) : null;
      
      const recordingData = {
        sessionId,
        audioData: audioBase64,
        videoData: videoBase64,
        timestamp: new Date().toISOString(),
        size: audioBlob.size + (videoBlob?.size || 0)
      };
      
      recordings.push({
        sessionId,
        timestamp: new Date().toISOString(),
        hasAudio: true,
        hasVideo: !!videoBlob,
        size: recordingData.size
      });
      
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify(recordings));
      localStorage.setItem(`recording_${sessionId}`, JSON.stringify(recordingData));
    } catch (error) {
      console.error('Error saving recording:', error);
    }
  }

  static getRecordingMetadata(): Array<{
    sessionId: string;
    timestamp: string;
    hasAudio: boolean;
    hasVideo: boolean;
    size: number;
  }> {
    const stored = localStorage.getItem(STORAGE_KEYS.RECORDINGS);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing recording metadata:', error);
      return [];
    }
  }

  static async getRecording(sessionId: string): Promise<{
    audioBlob: Blob;
    videoBlob?: Blob;
  } | null> {
    try {
      const stored = localStorage.getItem(`recording_${sessionId}`);
      if (!stored) return null;
      
      const recordingData = JSON.parse(stored);
      const audioBlob = await this.base64ToBlob(recordingData.audioData, 'audio/webm');
      const videoBlob = recordingData.videoData 
        ? await this.base64ToBlob(recordingData.videoData, 'video/webm')
        : undefined;
      
      return { audioBlob, videoBlob };
    } catch (error) {
      console.error('Error retrieving recording:', error);
      return null;
    }
  }

  static deleteRecording(sessionId: string): void {
    const recordings = this.getRecordingMetadata().filter(r => r.sessionId !== sessionId);
    localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify(recordings));
    localStorage.removeItem(`recording_${sessionId}`);
  }

  static deleteAllRecordings(): void {
    const recordings = this.getRecordingMetadata();
    recordings.forEach(recording => {
      localStorage.removeItem(`recording_${recording.sessionId}`);
    });
    localStorage.removeItem(STORAGE_KEYS.RECORDINGS);
  }

  // History and Analytics
  static updateHistory(): SessionHistory {
    const sessions = this.getSessions();
    const reports = this.getReports();
    
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const scoresWithReports = reports.map(r => r.overallScore).filter(score => score > 0);
    
    const averageScore = scoresWithReports.length > 0 
      ? scoresWithReports.reduce((sum, score) => sum + score, 0) / scoresWithReports.length
      : 0;
    
    // Calculate improvement trend (simplified)
    const recentScores = scoresWithReports.slice(-5);
    const olderScores = scoresWithReports.slice(-10, -5);
    const recentAvg = recentScores.length > 0 ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length : 0;
    const olderAvg = olderScores.length > 0 ? olderScores.reduce((a, b) => a + b, 0) / olderScores.length : 0;
    
    let improvementTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentAvg > olderAvg + 5) improvementTrend = 'improving';
    else if (recentAvg < olderAvg - 5) improvementTrend = 'declining';
    
    // Calculate streak (simplified - consecutive days with sessions)
    const sortedSessions = completedSessions
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
    
    let streakDays = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streakDays) {
        streakDays++;
      } else {
        break;
      }
    }
    
    const history: SessionHistory = {
      sessions: completedSessions,
      totalSessions: completedSessions.length,
      averageScore,
      improvementTrend,
      lastSessionDate: completedSessions.length > 0 ? completedSessions[0].startTime : new Date(),
      streakDays
    };
    
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    return history;
  }

  static getHistory(): SessionHistory | null {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!stored) return null;
    
    try {
      const history = JSON.parse(stored);
      return {
        ...history,
        sessions: history.sessions.map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : undefined
        })),
        lastSessionDate: new Date(history.lastSessionDate)
      };
    } catch (error) {
      console.error('Error parsing history:', error);
      return null;
    }
  }

  // Utility methods
  private static async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:type;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private static async base64ToBlob(base64: string, mimeType: string): Promise<Blob> {
    const response = await fetch(`data:${mimeType};base64,${base64}`);
    return response.blob();
  }

  // Export/Import functionality
  static exportData(): string {
    const data = {
      sessions: this.getSessions(),
      reports: this.getReports(),
      history: this.getHistory(),
      timestamp: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.sessions) {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(data.sessions));
      }
      
      if (data.reports) {
        localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(data.reports));
      }
      
      if (data.history) {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
      }
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Privacy and cleanup
  static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear individual recording data
    const recordings = this.getRecordingMetadata();
    recordings.forEach(recording => {
      localStorage.removeItem(`recording_${recording.sessionId}`);
    });
  }

  static getStorageUsage(): {
    totalSize: number;
    sessionCount: number;
    reportCount: number;
    recordingCount: number;
    recordingSize: number;
  } {
    const sessions = this.getSessions();
    const reports = this.getReports();
    const recordings = this.getRecordingMetadata();
    
    let totalSize = 0;
    let recordingSize = 0;
    
    // Calculate approximate storage usage
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length * 2; // Rough estimate (UTF-16)
      }
    });
    
    recordings.forEach(recording => {
      recordingSize += recording.size;
      const recordingData = localStorage.getItem(`recording_${recording.sessionId}`);
      if (recordingData) {
        totalSize += recordingData.length * 2;
      }
    });
    
    return {
      totalSize,
      sessionCount: sessions.length,
      reportCount: reports.length,
      recordingCount: recordings.length,
      recordingSize
    };
  }
}