import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuditingService } from './auditing.service';
import { AuditingAction } from '@amen24/shared';

@Injectable()
export class AuditListener {
  constructor(
    private readonly auditingService: AuditingService,
  ) { }

  @OnEvent('user.login')
  handleUserLoginEvent(payload: { email: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.LOGIN,
    });
  }

  @OnEvent('user.logout')
  handleUserLogoutEvent(payload: { email: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.LOGOUT,
    });
  }

  @OnEvent('profile.created')
  handleProfileCreatedEvent(payload: { email: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.CREATE_PROFILE,
    });
  }

  @OnEvent('profile.updated')
  handleProfileUpdatedEvent(payload: { email: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.UPDATE_PROFILE,
    });
  }

  @OnEvent('profile.deleted')
  handleProfileDeletedEvent(payload: { email: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.DELETE_PROFILE,
    });
  }

  @OnEvent('profile.resetPassword')
  handlePasswordResetEvent(payload: { email: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.RESET_PASSWORD,
    });
  }

  @OnEvent('bible.search')
  handleSearchBibleEvent(payload: { email: string, details: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.SEARCH_BIBLE,
      metadata: payload.details,
    });
  }

  @OnEvent('bible.open')
  handleOpenChapterEvent(payload: { email: string, details: string }) {
    this.auditingService.recordEvent({
      performedBy: payload.email,
      action: AuditingAction.OPEN_BIBLE,
      metadata: payload.details,
    });
  }
}
