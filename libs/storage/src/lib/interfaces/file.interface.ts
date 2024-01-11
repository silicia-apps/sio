export interface SioStorageFileInterface {
    /**
     * The Blob instance of the file.
     *
     * Only available on Web.
     */
    $id: string;
    blob?: Blob;
    /**
     * The Base64 string representation of the data contained in the file.
     *
     * Is only provided if `readData` is set to `true`.
     */
    data?: string;
    /**
     * The duration of the video in seconds.
     *
     * Only available on Android and iOS.
     *
     * @since 0.5.3
     */
    duration?: number;
    /**
     * The height of the image or video in pixels.
     *
     * Only available on Android and iOS.
     *
     * @since 0.5.3
     */
    height?: number;
    /**
     * The mime type of the file.
     */
    mimeType: string;
    /**
     * The last modified timestamp of the file in milliseconds.
     *
     * @since 0.5.9
     */
    modifiedAt?: number;
    /**
     * The name of the file.
     */
    name: string;
    /**
     * The path of the file.
     *
     * Only available on Android and iOS.
     */
    path?: string;
    /**
     * The size of the file in bytes.
     */
    size?: number;
    /**
     * The width of the image or video in pixels.
     *
     * Only available on Android and iOS.
     *
     * @since 0.5.3
     */
    width?: number;
  }