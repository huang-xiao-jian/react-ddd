/**
 * 对象存储访问元数据
 *
 * @example
 *
 * ```json
 * {
 *   "code": "0945c2a6-2766-4542-9905-d35c0171a0dd",
 *   "url": "genesis/za-graphene/uploadfile/mdm/188550729465863/brand.png",
 *   "name": "brand.png"
 * }
 * ```
 */
export interface DocumentRemoteReference {
  name: string;
  code: string;
  url: string;
}

/**
 * 系统内部文件存储形态
 */
export interface DocumentReference extends DocumentRemoteReference {
  annotation: string;
  receivedTime: number;
}
