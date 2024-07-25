// @ts-ignore
/* eslint-disable */

declare namespace API {
    // ################## ---------------------------------- #########################
    // ################## |                                | #########################
    // ################## |        API RESULT TYPE         | #########################
    // ################## |                                | #########################
    // ################## ---------------------------------- #########################
  
    // *** API'DEN DONEN JSON DOSYASININ MESAJLARINI TUTAR *** //
    interface Result {
      success?: boolean;
      message?: string;
    }
    // *** --- *** //
  
    // *** API'DEN DONEN JSON DOSYASI ILE BIRLIKTE DATA BULUNUYORSA ONUN TURUNU BELIRTIR *** //
    interface DataResult<T = any> extends Result {
      data?: T;
    }
    // *** --- *** //
  
    type IResult<T = any> = T extends undefined ? Result : DataResult<T>;
  
    // *** RESULT TYPE ALTERNATIFI *** //
    type ErrorResult = {
      /** 业务约定的错误码 */
      errorCode: string;
      /** 业务上的错误信息 */
      errorMessage?: string;
      /** 业务上的请求是否成功 */
      success?: boolean;
    };
    // *** --- *** //
  
    // ################## ---------------------------------- #########################
    // ################## |                                | #########################
    // ################## |           ENTITIES             | #########################
    // ################## |                                | #########################
    // ################## ---------------------------------- #########################
  
    interface IEntity {
      id?: string | number;
    }
  
    interface IEntityTimestamps {
      createdDate?: Date;
      updatedDate?: Date;
      deletedDate?: Date;
    }
  
    type Entity = IEntity & IEntityTimestamps;
  
    // ################## ---------------------------------- #########################
    // ################## |                                | #########################
    // ################## |           UTILITIES            | #########################
    // ################## |                                | #########################
    // ################## ---------------------------------- #########################
  
    type CrudStatus = 'Creating' | 'Reading' | 'Updating' | 'Deleting';
  
    type CurrentUser = {
      name?: string;
      given_name?: string;
      family_name?: string;
      avatar?: string;
      userid?: string;
      email?: string;
      email_verified?: boolean;
      signature?: string;
      title?: string;
      group?: string;
      preferred_username?: string;
      tags?: { key?: string; label?: string }[];
      notifyCount?: number;
      unreadCount?: number;
      country?: string;
      access?: string;
      geographic?: {
        province?: { label?: string; key?: string };
        city?: { label?: string; key?: string };
      };
      address?: string;
      phone?: string;
    };
  
    type LoginResult = {
      status?: string;
      type?: string;
      currentAuthority?: string;
    };
  
    type PageParams = {
      current?: number;
      pageSize?: number;
    };
  
    type RuleListItem = {
      key?: number;
      disabled?: boolean;
      href?: string;
      avatar?: string;
      name?: string;
      owner?: string;
      desc?: string;
      callNo?: number;
      status?: number;
      updatedAt?: string;
      createdAt?: string;
      progress?: number;
    };
  
    type RuleList = {
      data?: RuleListItem[];
      /** 列表的内容总数 */
      total?: number;
      success?: boolean;
    };
  
    type FakeCaptcha = {
      code?: number;
      status?: string;
    };
  
    type LoginParams = {
      username?: string;
      password?: string;
      autoLogin?: boolean;
      type?: string;
    };
  
    type ErrorResponse = {
      /** 业务约定的错误码 */
      errorCode: string;
      /** 业务上的错误信息 */
      errorMessage?: string;
      /** 业务上的请求是否成功 */
      success?: boolean;
    };
  
    type NoticeIconList = {
      data?: NoticeIconItem[];
      /** 列表的内容总数 */
      total?: number;
      success?: boolean;
    };
  
    type NoticeIconItemType = 'notification' | 'message' | 'event';
  
    type NoticeIconItem = {
      id?: string;
      extra?: string;
      key?: string;
      read?: boolean;
      avatar?: string;
      title?: string;
      status?: string;
      datetime?: string;
      description?: string;
      type?: NoticeIconItemType;
    };
  }
  