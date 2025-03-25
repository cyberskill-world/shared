import type { AbstractIntlMessages } from 'next-intl';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import type { AggregatePaginateModel } from 'mongoose';
import type { AggregatePaginateResult } from 'mongoose';
import { ApolloCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { ApolloClientOptions } from '@apollo/client';
import type { ClientSession } from 'mongoose';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { Collection } from 'mongodb';
import type { ComponentType } from 'react';
import { ConfigNames } from '@antfu/eslint-config';
import { Context } from 'react';
import { Db } from 'mongodb';
import type { DeleteResult } from 'mongodb';
import { Document as Document_2 } from 'mongoose';
import type { ErrorHandlingMiddlewareFunction } from 'mongoose';
import type { ErrorHandlingMiddlewareWithOption } from 'mongoose';
import type { Filter } from 'mongodb';
import type { FilterQuery } from 'mongoose';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { InitOptions } from 'i18next';
import type { InsertManyOptions } from 'mongoose';
import type { InsertManyResult } from 'mongodb';
import type { InsertOneResult } from 'mongodb';
import type { JSX } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import type { Locale } from 'date-fns';
import { Model } from 'mongoose';
import type mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import type { OptionalUnlessRequiredId } from 'mongodb';
import type { PaginateModel } from 'mongoose';
import type { PaginateOptions } from 'mongoose';
import type { PaginateResult } from 'mongoose';
import type { PipelineStage } from 'mongoose';
import type { PopulateOption } from 'mongoose';
import type { PopulateOptions } from 'mongoose';
import type { PostMiddlewareFunction } from 'mongoose';
import type { PreMiddlewareFunction } from 'mongoose';
import type { PreSaveMiddlewareFunction } from 'mongoose';
import type { ProjectionType } from 'mongoose';
import type { QueryOptions } from 'mongoose';
import type { QueryWithHelpers } from 'mongoose';
import type { ReactElement } from 'react';
import type { ReactNode } from 'react';
import type { Schema } from 'mongoose';
import type { SchemaDefinition } from 'mongoose';
import { TFunction } from 'i18next';
import type { Timezone } from 'next-intl';
import { TypedFlatConfigItem } from '@antfu/eslint-config';
import type { UpdateQuery } from 'mongoose';
import type { UpdateResult } from 'mongodb';
import type { UserConfig } from 'vite';
import { useTranslations } from 'use-intl';
import type { WithId } from 'mongodb';

export { aggregatePaginate }
export { aggregatePaginate as aggregatePaginate_alias_1 }
export { aggregatePaginate as aggregatePaginate_alias_2 }

export { ApolloCache }
export { ApolloCache as ApolloCache_alias_1 }
export { ApolloCache as ApolloCache_alias_2 }

export { ApolloClient }
export { ApolloClient as ApolloClient_alias_1 }
export { ApolloClient as ApolloClient_alias_2 }

export { ApolloClientOptions }
export { ApolloClientOptions as ApolloClientOptions_alias_1 }
export { ApolloClientOptions as ApolloClientOptions_alias_2 }

declare function ApolloProvider({ isNextJS, options, children, client: CustomClient, provider: CustomProvider, cache: CustomCache, }: I_ApolloProviderProps_2): JSX_2.Element;
export { ApolloProvider }
export { ApolloProvider as ApolloProvider_alias_1 }
export { ApolloProvider as ApolloProvider_alias_2 }

declare class C_Collection<T extends Partial<C_Document>> extends Collection<T> {
}
export { C_Collection }
export { C_Collection as C_Collection_alias_1 }
export { C_Collection as C_Collection_alias_2 }

declare class C_Db extends Db {
}
export { C_Db }
export { C_Db as C_Db_alias_1 }
export { C_Db as C_Db_alias_2 }

declare class C_Db_2 extends Db { }

declare class C_Document extends Document_2 {
}
export { C_Document }
export { C_Document as C_Document_alias_1 }
export { C_Document as C_Document_alias_2 }

declare class C_Document_2 extends Document_2 { }

declare class C_Model extends Model {
}
export { C_Model }
export { C_Model as C_Model_alias_1 }
export { C_Model as C_Model_alias_2 }

declare function clearAllErrorLists(): Promise<void>;
export { clearAllErrorLists }
export { clearAllErrorLists as clearAllErrorLists_alias_1 }
export { clearAllErrorLists as clearAllErrorLists_alias_2 }

declare const commandLog: {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    printBoxedLog: typeof printBoxedLog;
};
export { commandLog }
export { commandLog as commandLog_alias_1 }
export { commandLog as commandLog_alias_2 }

declare function createGraphqlCodegenConfig({ uri, from, to, withComponent, withHOC, withHooks, withMutationFn, withRefetchFn, }: I_GraphqlCodegenConfig_2): CodegenConfig;
export { createGraphqlCodegenConfig }
export { createGraphqlCodegenConfig as createGraphqlCodegenConfig_alias_1 }

declare function createModel<T extends Partial<C_Document_2>>({ mongoose, name, schema, pagination, aggregate, virtuals, middlewares, }: I_CreateModelOptions_2<T>): I_ExtendedModel_2<T>;
export { createModel }
export { createModel as createModel_alias_1 }
export { createModel as createModel_alias_2 }

declare function createMongoGenericFields({ returnDateAs, }?: {
    returnDateAs?: 'string' | 'date';
}): I_GenericDocument_2;
export { createMongoGenericFields }
export { createMongoGenericFields as createMongoGenericFields_alias_1 }
export { createMongoGenericFields as createMongoGenericFields_alias_2 }

declare function createSchema<T extends Partial<C_Document_2>>({ mongoose, schema, virtuals, standalone, }: I_CreateSchemaOptions_2<T>): T_MongooseShema_2<T>;
export { createSchema }
export { createSchema as createSchema_alias_1 }
export { createSchema as createSchema_alias_2 }

declare function createSlugQuery<T>(slug: string, filters?: T_FilterQuery_2<T>, id?: string): T_CreateSlugQueryResponse_2<T>;
export { createSlugQuery }
export { createSlugQuery as createSlugQuery_alias_1 }
export { createSlugQuery as createSlugQuery_alias_2 }

declare function deepMerge(...configs: (I_Config_2 | I_Config_2[])[]): I_Config_2;
export { deepMerge }
export { deepMerge as deepMerge_alias_1 }
export { deepMerge as deepMerge_alias_2 }

export declare const default_alias: {
    merge: (type?: string, ...configs: I_Config_2[]) => I_Config_2 | FlatConfigComposer<TypedFlatConfigItem, ConfigNames>;
};

export declare const default_alias_1: {
    extends: string[];
};

export declare const default_alias_2: {
    languageOptions: {
        globals: {
            AbortController: false;
            AbortSignal: false;
            AbsoluteOrientationSensor: false;
            AbstractRange: false;
            Accelerometer: false;
            addEventListener: false;
            ai: false;
            AI: false;
            AITextSession: false;
            alert: false;
            AnalyserNode: false;
            Animation: false;
            AnimationEffect: false;
            AnimationEvent: false;
            AnimationPlaybackEvent: false;
            AnimationTimeline: false;
            atob: false;
            Attr: false;
            Audio: false;
            AudioBuffer: false;
            AudioBufferSourceNode: false;
            AudioContext: false;
            AudioData: false;
            AudioDecoder: false;
            AudioDestinationNode: false;
            AudioEncoder: false;
            AudioListener: false;
            AudioNode: false;
            AudioParam: false;
            AudioParamMap: false;
            AudioProcessingEvent: false;
            AudioScheduledSourceNode: false;
            AudioSinkInfo: false;
            AudioWorklet: false;
            AudioWorkletGlobalScope: false;
            AudioWorkletNode: false;
            AudioWorkletProcessor: false;
            AuthenticatorAssertionResponse: false;
            AuthenticatorAttestationResponse: false;
            AuthenticatorResponse: false;
            BackgroundFetchManager: false;
            BackgroundFetchRecord: false;
            BackgroundFetchRegistration: false;
            BarcodeDetector: false;
            BarProp: false;
            BaseAudioContext: false;
            BatteryManager: false;
            BeforeUnloadEvent: false;
            BiquadFilterNode: false;
            Blob: false;
            BlobEvent: false;
            Bluetooth: false;
            BluetoothCharacteristicProperties: false;
            BluetoothDevice: false;
            BluetoothRemoteGATTCharacteristic: false;
            BluetoothRemoteGATTDescriptor: false;
            BluetoothRemoteGATTServer: false;
            BluetoothRemoteGATTService: false;
            BluetoothUUID: false;
            blur: false;
            BroadcastChannel: false;
            BrowserCaptureMediaStreamTrack: false;
            btoa: false;
            ByteLengthQueuingStrategy: false;
            Cache: false;
            caches: false;
            CacheStorage: false;
            cancelAnimationFrame: false;
            cancelIdleCallback: false;
            CanvasCaptureMediaStream: false;
            CanvasCaptureMediaStreamTrack: false;
            CanvasGradient: false;
            CanvasPattern: false;
            CanvasRenderingContext2D: false;
            CaptureController: false;
            CaretPosition: false;
            CDATASection: false;
            ChannelMergerNode: false;
            ChannelSplitterNode: false;
            ChapterInformation: false;
            CharacterBoundsUpdateEvent: false;
            CharacterData: false;
            clearInterval: false;
            clearTimeout: false;
            clientInformation: false;
            Clipboard: false;
            ClipboardEvent: false;
            ClipboardItem: false;
            close: false;
            closed: false;
            CloseEvent: false;
            CloseWatcher: false;
            Comment: false;
            CompositionEvent: false;
            CompressionStream: false;
            confirm: false;
            console: false;
            ConstantSourceNode: false;
            ContentVisibilityAutoStateChangeEvent: false;
            ConvolverNode: false;
            CookieChangeEvent: false;
            CookieDeprecationLabel: false;
            cookieStore: false;
            CookieStore: false;
            CookieStoreManager: false;
            CountQueuingStrategy: false;
            createImageBitmap: false;
            Credential: false;
            credentialless: false;
            CredentialsContainer: false;
            CropTarget: false;
            crossOriginIsolated: false;
            crypto: false;
            Crypto: false;
            CryptoKey: false;
            CSS: false;
            CSSAnimation: false;
            CSSConditionRule: false;
            CSSContainerRule: false;
            CSSCounterStyleRule: false;
            CSSFontFaceRule: false;
            CSSFontFeatureValuesRule: false;
            CSSFontPaletteValuesRule: false;
            CSSGroupingRule: false;
            CSSImageValue: false;
            CSSImportRule: false;
            CSSKeyframeRule: false;
            CSSKeyframesRule: false;
            CSSKeywordValue: false;
            CSSLayerBlockRule: false;
            CSSLayerStatementRule: false;
            CSSMarginRule: false;
            CSSMathClamp: false;
            CSSMathInvert: false;
            CSSMathMax: false;
            CSSMathMin: false;
            CSSMathNegate: false;
            CSSMathProduct: false;
            CSSMathSum: false;
            CSSMathValue: false;
            CSSMatrixComponent: false;
            CSSMediaRule: false;
            CSSNamespaceRule: false;
            CSSNestedDeclarations: false;
            CSSNumericArray: false;
            CSSNumericValue: false;
            CSSPageDescriptors: false;
            CSSPageRule: false;
            CSSPerspective: false;
            CSSPositionTryDescriptors: false;
            CSSPositionTryRule: false;
            CSSPositionValue: false;
            CSSPropertyRule: false;
            CSSRotate: false;
            CSSRule: false;
            CSSRuleList: false;
            CSSScale: false;
            CSSScopeRule: false;
            CSSSkew: false;
            CSSSkewX: false;
            CSSSkewY: false;
            CSSStartingStyleRule: false;
            CSSStyleDeclaration: false;
            CSSStyleRule: false;
            CSSStyleSheet: false;
            CSSStyleValue: false;
            CSSSupportsRule: false;
            CSSTransformComponent: false;
            CSSTransformValue: false;
            CSSTransition: false;
            CSSTranslate: false;
            CSSUnitValue: false;
            CSSUnparsedValue: false;
            CSSVariableReferenceValue: false;
            CSSViewTransitionRule: false;
            currentFrame: false;
            currentTime: false;
            CustomElementRegistry: false;
            customElements: false;
            CustomEvent: false;
            CustomStateSet: false;
            DataTransfer: false;
            DataTransferItem: false;
            DataTransferItemList: false;
            DecompressionStream: false;
            DelayNode: false;
            DelegatedInkTrailPresenter: false;
            DeviceMotionEvent: false;
            DeviceMotionEventAcceleration: false;
            DeviceMotionEventRotationRate: false;
            DeviceOrientationEvent: false;
            devicePixelRatio: false;
            dispatchEvent: false;
            document: false;
            Document: false;
            DocumentFragment: false;
            documentPictureInPicture: false;
            DocumentPictureInPicture: false;
            DocumentPictureInPictureEvent: false;
            DocumentTimeline: false;
            DocumentType: false;
            DOMError: false;
            DOMException: false;
            DOMImplementation: false;
            DOMMatrix: false;
            DOMMatrixReadOnly: false;
            DOMParser: false;
            DOMPoint: false;
            DOMPointReadOnly: false;
            DOMQuad: false;
            DOMRect: false;
            DOMRectList: false;
            DOMRectReadOnly: false;
            DOMStringList: false;
            DOMStringMap: false;
            DOMTokenList: false;
            DragEvent: false;
            DynamicsCompressorNode: false;
            EditContext: false;
            Element: false;
            ElementInternals: false;
            EncodedAudioChunk: false;
            EncodedVideoChunk: false;
            ErrorEvent: false;
            event: false;
            Event: false;
            EventCounts: false;
            EventSource: false;
            EventTarget: false;
            external: false;
            External: false;
            EyeDropper: false;
            FeaturePolicy: false;
            FederatedCredential: false;
            fence: false;
            Fence: false;
            FencedFrameConfig: false;
            fetch: false;
            fetchLater: false;
            FetchLaterResult: false;
            File: false;
            FileList: false;
            FileReader: false;
            FileSystem: false;
            FileSystemDirectoryEntry: false;
            FileSystemDirectoryHandle: false;
            FileSystemDirectoryReader: false;
            FileSystemEntry: false;
            FileSystemFileEntry: false;
            FileSystemFileHandle: false;
            FileSystemHandle: false;
            FileSystemWritableFileStream: false;
            find: false;
            Float16Array: false;
            focus: false;
            FocusEvent: false;
            FontData: false;
            FontFace: false;
            FontFaceSet: false;
            FontFaceSetLoadEvent: false;
            FormData: false;
            FormDataEvent: false;
            FragmentDirective: false;
            frameElement: false;
            frames: false;
            GainNode: false;
            Gamepad: false;
            GamepadAxisMoveEvent: false;
            GamepadButton: false;
            GamepadButtonEvent: false;
            GamepadEvent: false;
            GamepadHapticActuator: false;
            GamepadPose: false;
            Geolocation: false;
            GeolocationCoordinates: false;
            GeolocationPosition: false;
            GeolocationPositionError: false;
            getComputedStyle: false;
            getScreenDetails: false;
            getSelection: false;
            GPU: false;
            GPUAdapter: false;
            GPUAdapterInfo: false;
            GPUBindGroup: false;
            GPUBindGroupLayout: false;
            GPUBuffer: false;
            GPUBufferUsage: false;
            GPUCanvasContext: false;
            GPUColorWrite: false;
            GPUCommandBuffer: false;
            GPUCommandEncoder: false;
            GPUCompilationInfo: false;
            GPUCompilationMessage: false;
            GPUComputePassEncoder: false;
            GPUComputePipeline: false;
            GPUDevice: false;
            GPUDeviceLostInfo: false;
            GPUError: false;
            GPUExternalTexture: false;
            GPUInternalError: false;
            GPUMapMode: false;
            GPUOutOfMemoryError: false;
            GPUPipelineError: false;
            GPUPipelineLayout: false;
            GPUQuerySet: false;
            GPUQueue: false;
            GPURenderBundle: false;
            GPURenderBundleEncoder: false;
            GPURenderPassEncoder: false;
            GPURenderPipeline: false;
            GPUSampler: false;
            GPUShaderModule: false;
            GPUShaderStage: false;
            GPUSupportedFeatures: false;
            GPUSupportedLimits: false;
            GPUTexture: false;
            GPUTextureUsage: false;
            GPUTextureView: false;
            GPUUncapturedErrorEvent: false;
            GPUValidationError: false;
            GravitySensor: false;
            Gyroscope: false;
            HashChangeEvent: false;
            Headers: false;
            HID: false;
            HIDConnectionEvent: false;
            HIDDevice: false;
            HIDInputReportEvent: false;
            Highlight: false;
            HighlightRegistry: false;
            history: false;
            History: false;
            HTMLAllCollection: false;
            HTMLAnchorElement: false;
            HTMLAreaElement: false;
            HTMLAudioElement: false;
            HTMLBaseElement: false;
            HTMLBodyElement: false;
            HTMLBRElement: false;
            HTMLButtonElement: false;
            HTMLCanvasElement: false;
            HTMLCollection: false;
            HTMLDataElement: false;
            HTMLDataListElement: false;
            HTMLDetailsElement: false;
            HTMLDialogElement: false;
            HTMLDirectoryElement: false;
            HTMLDivElement: false;
            HTMLDListElement: false;
            HTMLDocument: false;
            HTMLElement: false;
            HTMLEmbedElement: false;
            HTMLFencedFrameElement: false;
            HTMLFieldSetElement: false;
            HTMLFontElement: false;
            HTMLFormControlsCollection: false;
            HTMLFormElement: false;
            HTMLFrameElement: false;
            HTMLFrameSetElement: false;
            HTMLHeadElement: false;
            HTMLHeadingElement: false;
            HTMLHRElement: false;
            HTMLHtmlElement: false;
            HTMLIFrameElement: false;
            HTMLImageElement: false;
            HTMLInputElement: false;
            HTMLLabelElement: false;
            HTMLLegendElement: false;
            HTMLLIElement: false;
            HTMLLinkElement: false;
            HTMLMapElement: false;
            HTMLMarqueeElement: false;
            HTMLMediaElement: false;
            HTMLMenuElement: false;
            HTMLMetaElement: false;
            HTMLMeterElement: false;
            HTMLModElement: false;
            HTMLObjectElement: false;
            HTMLOListElement: false;
            HTMLOptGroupElement: false;
            HTMLOptionElement: false;
            HTMLOptionsCollection: false;
            HTMLOutputElement: false;
            HTMLParagraphElement: false;
            HTMLParamElement: false;
            HTMLPictureElement: false;
            HTMLPreElement: false;
            HTMLProgressElement: false;
            HTMLQuoteElement: false;
            HTMLScriptElement: false;
            HTMLSelectElement: false;
            HTMLSlotElement: false;
            HTMLSourceElement: false;
            HTMLSpanElement: false;
            HTMLStyleElement: false;
            HTMLTableCaptionElement: false;
            HTMLTableCellElement: false;
            HTMLTableColElement: false;
            HTMLTableElement: false;
            HTMLTableRowElement: false;
            HTMLTableSectionElement: false;
            HTMLTemplateElement: false;
            HTMLTextAreaElement: false;
            HTMLTimeElement: false;
            HTMLTitleElement: false;
            HTMLTrackElement: false;
            HTMLUListElement: false;
            HTMLUnknownElement: false;
            HTMLVideoElement: false;
            IDBCursor: false;
            IDBCursorWithValue: false;
            IDBDatabase: false;
            IDBFactory: false;
            IDBIndex: false;
            IDBKeyRange: false;
            IDBObjectStore: false;
            IDBOpenDBRequest: false;
            IDBRequest: false;
            IDBTransaction: false;
            IDBVersionChangeEvent: false;
            IdentityCredential: false;
            IdentityCredentialError: false;
            IdentityProvider: false;
            IdleDeadline: false;
            IdleDetector: false;
            IIRFilterNode: false;
            Image: false;
            ImageBitmap: false;
            ImageBitmapRenderingContext: false;
            ImageCapture: false;
            ImageData: false;
            ImageDecoder: false;
            ImageTrack: false;
            ImageTrackList: false;
            indexedDB: false;
            Ink: false;
            innerHeight: false;
            innerWidth: false;
            InputDeviceCapabilities: false;
            InputDeviceInfo: false;
            InputEvent: false;
            IntersectionObserver: false;
            IntersectionObserverEntry: false;
            isSecureContext: false;
            Keyboard: false;
            KeyboardEvent: false;
            KeyboardLayoutMap: false;
            KeyframeEffect: false;
            LargestContentfulPaint: false;
            LaunchParams: false;
            launchQueue: false;
            LaunchQueue: false;
            LayoutShift: false;
            LayoutShiftAttribution: false;
            length: false;
            LinearAccelerationSensor: false;
            localStorage: false;
            location: true;
            Location: false;
            locationbar: false;
            Lock: false;
            LockManager: false;
            matchMedia: false;
            MathMLElement: false;
            MediaCapabilities: false;
            MediaCapabilitiesInfo: false;
            MediaDeviceInfo: false;
            MediaDevices: false;
            MediaElementAudioSourceNode: false;
            MediaEncryptedEvent: false;
            MediaError: false;
            MediaKeyError: false;
            MediaKeyMessageEvent: false;
            MediaKeys: false;
            MediaKeySession: false;
            MediaKeyStatusMap: false;
            MediaKeySystemAccess: false;
            MediaList: false;
            MediaMetadata: false;
            MediaQueryList: false;
            MediaQueryListEvent: false;
            MediaRecorder: false;
            MediaRecorderErrorEvent: false;
            MediaSession: false;
            MediaSource: false;
            MediaSourceHandle: false;
            MediaStream: false;
            MediaStreamAudioDestinationNode: false;
            MediaStreamAudioSourceNode: false;
            MediaStreamEvent: false;
            MediaStreamTrack: false;
            MediaStreamTrackAudioSourceNode: false;
            MediaStreamTrackAudioStats: false;
            MediaStreamTrackEvent: false;
            MediaStreamTrackGenerator: false;
            MediaStreamTrackProcessor: false;
            MediaStreamTrackVideoStats: false;
            menubar: false;
            MessageChannel: false;
            MessageEvent: false;
            MessagePort: false;
            MIDIAccess: false;
            MIDIConnectionEvent: false;
            MIDIInput: false;
            MIDIInputMap: false;
            MIDIMessageEvent: false;
            MIDIOutput: false;
            MIDIOutputMap: false;
            MIDIPort: false;
            MimeType: false;
            MimeTypeArray: false;
            model: false;
            ModelGenericSession: false;
            ModelManager: false;
            MouseEvent: false;
            moveBy: false;
            moveTo: false;
            MutationEvent: false;
            MutationObserver: false;
            MutationRecord: false;
            name: false;
            NamedNodeMap: false;
            NavigateEvent: false;
            navigation: false;
            Navigation: false;
            NavigationActivation: false;
            NavigationCurrentEntryChangeEvent: false;
            NavigationDestination: false;
            NavigationHistoryEntry: false;
            NavigationPreloadManager: false;
            NavigationTransition: false;
            navigator: false;
            Navigator: false;
            NavigatorLogin: false;
            NavigatorManagedData: false;
            NavigatorUAData: false;
            NetworkInformation: false;
            Node: false;
            NodeFilter: false;
            NodeIterator: false;
            NodeList: false;
            Notification: false;
            NotifyPaintEvent: false;
            NotRestoredReasonDetails: false;
            NotRestoredReasons: false;
            OfflineAudioCompletionEvent: false;
            OfflineAudioContext: false;
            offscreenBuffering: false;
            OffscreenCanvas: false;
            OffscreenCanvasRenderingContext2D: false;
            onabort: true;
            onafterprint: true;
            onanimationcancel: true;
            onanimationend: true;
            onanimationiteration: true;
            onanimationstart: true;
            onappinstalled: true;
            onauxclick: true;
            onbeforeinput: true;
            onbeforeinstallprompt: true;
            onbeforematch: true;
            onbeforeprint: true;
            onbeforetoggle: true;
            onbeforeunload: true;
            onbeforexrselect: true;
            onblur: true;
            oncancel: true;
            oncanplay: true;
            oncanplaythrough: true;
            onchange: true;
            onclick: true;
            onclose: true;
            oncontentvisibilityautostatechange: true;
            oncontextlost: true;
            oncontextmenu: true;
            oncontextrestored: true;
            oncopy: true;
            oncuechange: true;
            oncut: true;
            ondblclick: true;
            ondevicemotion: true;
            ondeviceorientation: true;
            ondeviceorientationabsolute: true;
            ondrag: true;
            ondragend: true;
            ondragenter: true;
            ondragleave: true;
            ondragover: true;
            ondragstart: true;
            ondrop: true;
            ondurationchange: true;
            onemptied: true;
            onended: true;
            onerror: true;
            onfocus: true;
            onformdata: true;
            ongamepadconnected: true;
            ongamepaddisconnected: true;
            ongotpointercapture: true;
            onhashchange: true;
            oninput: true;
            oninvalid: true;
            onkeydown: true;
            onkeypress: true;
            onkeyup: true;
            onlanguagechange: true;
            onload: true;
            onloadeddata: true;
            onloadedmetadata: true;
            onloadstart: true;
            onlostpointercapture: true;
            onmessage: true;
            onmessageerror: true;
            onmousedown: true;
            onmouseenter: true;
            onmouseleave: true;
            onmousemove: true;
            onmouseout: true;
            onmouseover: true;
            onmouseup: true;
            onmousewheel: true;
            onoffline: true;
            ononline: true;
            onpagehide: true;
            onpagereveal: true;
            onpageshow: true;
            onpageswap: true;
            onpaste: true;
            onpause: true;
            onplay: true;
            onplaying: true;
            onpointercancel: true;
            onpointerdown: true;
            onpointerenter: true;
            onpointerleave: true;
            onpointermove: true;
            onpointerout: true;
            onpointerover: true;
            onpointerrawupdate: true;
            onpointerup: true;
            onpopstate: true;
            onprogress: true;
            onratechange: true;
            onrejectionhandled: true;
            onreset: true;
            onresize: true;
            onscroll: true;
            onscrollend: true;
            onscrollsnapchange: true;
            onscrollsnapchanging: true;
            onsearch: true;
            onsecuritypolicyviolation: true;
            onseeked: true;
            onseeking: true;
            onselect: true;
            onselectionchange: true;
            onselectstart: true;
            onslotchange: true;
            onstalled: true;
            onstorage: true;
            onsubmit: true;
            onsuspend: true;
            ontimeupdate: true;
            ontoggle: true;
            ontransitioncancel: true;
            ontransitionend: true;
            ontransitionrun: true;
            ontransitionstart: true;
            onunhandledrejection: true;
            onunload: true;
            onvolumechange: true;
            onwaiting: true;
            onwheel: true;
            open: false;
            opener: false;
            Option: false;
            OrientationSensor: false;
            origin: false;
            originAgentCluster: false;
            OscillatorNode: false;
            OTPCredential: false;
            outerHeight: false;
            outerWidth: false;
            OverconstrainedError: false;
            PageRevealEvent: false;
            PageSwapEvent: false;
            PageTransitionEvent: false;
            pageXOffset: false;
            pageYOffset: false;
            PannerNode: false;
            parent: false;
            PasswordCredential: false;
            Path2D: false;
            PaymentAddress: false;
            PaymentManager: false;
            PaymentMethodChangeEvent: false;
            PaymentRequest: false;
            PaymentRequestUpdateEvent: false;
            PaymentResponse: false;
            performance: false;
            Performance: false;
            PerformanceElementTiming: false;
            PerformanceEntry: false;
            PerformanceEventTiming: false;
            PerformanceLongAnimationFrameTiming: false;
            PerformanceLongTaskTiming: false;
            PerformanceMark: false;
            PerformanceMeasure: false;
            PerformanceNavigation: false;
            PerformanceNavigationTiming: false;
            PerformanceObserver: false;
            PerformanceObserverEntryList: false;
            PerformancePaintTiming: false;
            PerformanceResourceTiming: false;
            PerformanceScriptTiming: false;
            PerformanceServerTiming: false;
            PerformanceTiming: false;
            PeriodicSyncManager: false;
            PeriodicWave: false;
            Permissions: false;
            PermissionStatus: false;
            PERSISTENT: false;
            personalbar: false;
            PictureInPictureEvent: false;
            PictureInPictureWindow: false;
            Plugin: false;
            PluginArray: false;
            PointerEvent: false;
            PopStateEvent: false;
            postMessage: false;
            Presentation: false;
            PresentationAvailability: false;
            PresentationConnection: false;
            PresentationConnectionAvailableEvent: false;
            PresentationConnectionCloseEvent: false;
            PresentationConnectionList: false;
            PresentationReceiver: false;
            PresentationRequest: false;
            PressureObserver: false;
            PressureRecord: false;
            print: false;
            ProcessingInstruction: false;
            Profiler: false;
            ProgressEvent: false;
            PromiseRejectionEvent: false;
            prompt: false;
            ProtectedAudience: false;
            PublicKeyCredential: false;
            PushManager: false;
            PushSubscription: false;
            PushSubscriptionOptions: false;
            queryLocalFonts: false;
            queueMicrotask: false;
            RadioNodeList: false;
            Range: false;
            ReadableByteStreamController: false;
            ReadableStream: false;
            ReadableStreamBYOBReader: false;
            ReadableStreamBYOBRequest: false;
            ReadableStreamDefaultController: false;
            ReadableStreamDefaultReader: false;
            registerProcessor: false;
            RelativeOrientationSensor: false;
            RemotePlayback: false;
            removeEventListener: false;
            reportError: false;
            ReportingObserver: false;
            Request: false;
            requestAnimationFrame: false;
            requestIdleCallback: false;
            resizeBy: false;
            ResizeObserver: false;
            ResizeObserverEntry: false;
            ResizeObserverSize: false;
            resizeTo: false;
            Response: false;
            RTCCertificate: false;
            RTCDataChannel: false;
            RTCDataChannelEvent: false;
            RTCDtlsTransport: false;
            RTCDTMFSender: false;
            RTCDTMFToneChangeEvent: false;
            RTCEncodedAudioFrame: false;
            RTCEncodedVideoFrame: false;
            RTCError: false;
            RTCErrorEvent: false;
            RTCIceCandidate: false;
            RTCIceTransport: false;
            RTCPeerConnection: false;
            RTCPeerConnectionIceErrorEvent: false;
            RTCPeerConnectionIceEvent: false;
            RTCRtpReceiver: false;
            RTCRtpScriptTransform: false;
            RTCRtpSender: false;
            RTCRtpTransceiver: false;
            RTCSctpTransport: false;
            RTCSessionDescription: false;
            RTCStatsReport: false;
            RTCTrackEvent: false;
            sampleRate: false;
            scheduler: false;
            Scheduler: false;
            Scheduling: false;
            screen: false;
            Screen: false;
            ScreenDetailed: false;
            ScreenDetails: false;
            screenLeft: false;
            ScreenOrientation: false;
            screenTop: false;
            screenX: false;
            screenY: false;
            ScriptProcessorNode: false;
            scroll: false;
            scrollbars: false;
            scrollBy: false;
            ScrollTimeline: false;
            scrollTo: false;
            scrollX: false;
            scrollY: false;
            SecurityPolicyViolationEvent: false;
            Selection: false;
            self: false;
            Sensor: false;
            SensorErrorEvent: false;
            Serial: false;
            SerialPort: false;
            ServiceWorker: false;
            ServiceWorkerContainer: false;
            ServiceWorkerRegistration: false;
            sessionStorage: false;
            setInterval: false;
            setTimeout: false;
            ShadowRoot: false;
            sharedStorage: false;
            SharedStorage: false;
            SharedStorageWorklet: false;
            SharedWorker: false;
            showDirectoryPicker: false;
            showOpenFilePicker: false;
            showSaveFilePicker: false;
            SnapEvent: false;
            SourceBuffer: false;
            SourceBufferList: false;
            speechSynthesis: false;
            SpeechSynthesis: false;
            SpeechSynthesisErrorEvent: false;
            SpeechSynthesisEvent: false;
            SpeechSynthesisUtterance: false;
            SpeechSynthesisVoice: false;
            StaticRange: false;
            status: false;
            statusbar: false;
            StereoPannerNode: false;
            stop: false;
            Storage: false;
            StorageBucket: false;
            StorageBucketManager: false;
            StorageEvent: false;
            StorageManager: false;
            structuredClone: false;
            styleMedia: false;
            StylePropertyMap: false;
            StylePropertyMapReadOnly: false;
            StyleSheet: false;
            StyleSheetList: false;
            SubmitEvent: false;
            SubtleCrypto: false;
            SVGAElement: false;
            SVGAngle: false;
            SVGAnimatedAngle: false;
            SVGAnimatedBoolean: false;
            SVGAnimatedEnumeration: false;
            SVGAnimatedInteger: false;
            SVGAnimatedLength: false;
            SVGAnimatedLengthList: false;
            SVGAnimatedNumber: false;
            SVGAnimatedNumberList: false;
            SVGAnimatedPreserveAspectRatio: false;
            SVGAnimatedRect: false;
            SVGAnimatedString: false;
            SVGAnimatedTransformList: false;
            SVGAnimateElement: false;
            SVGAnimateMotionElement: false;
            SVGAnimateTransformElement: false;
            SVGAnimationElement: false;
            SVGCircleElement: false;
            SVGClipPathElement: false;
            SVGComponentTransferFunctionElement: false;
            SVGDefsElement: false;
            SVGDescElement: false;
            SVGElement: false;
            SVGEllipseElement: false;
            SVGFEBlendElement: false;
            SVGFEColorMatrixElement: false;
            SVGFEComponentTransferElement: false;
            SVGFECompositeElement: false;
            SVGFEConvolveMatrixElement: false;
            SVGFEDiffuseLightingElement: false;
            SVGFEDisplacementMapElement: false;
            SVGFEDistantLightElement: false;
            SVGFEDropShadowElement: false;
            SVGFEFloodElement: false;
            SVGFEFuncAElement: false;
            SVGFEFuncBElement: false;
            SVGFEFuncGElement: false;
            SVGFEFuncRElement: false;
            SVGFEGaussianBlurElement: false;
            SVGFEImageElement: false;
            SVGFEMergeElement: false;
            SVGFEMergeNodeElement: false;
            SVGFEMorphologyElement: false;
            SVGFEOffsetElement: false;
            SVGFEPointLightElement: false;
            SVGFESpecularLightingElement: false;
            SVGFESpotLightElement: false;
            SVGFETileElement: false;
            SVGFETurbulenceElement: false;
            SVGFilterElement: false;
            SVGForeignObjectElement: false;
            SVGGElement: false;
            SVGGeometryElement: false;
            SVGGradientElement: false;
            SVGGraphicsElement: false;
            SVGImageElement: false;
            SVGLength: false;
            SVGLengthList: false;
            SVGLinearGradientElement: false;
            SVGLineElement: false;
            SVGMarkerElement: false;
            SVGMaskElement: false;
            SVGMatrix: false;
            SVGMetadataElement: false;
            SVGMPathElement: false;
            SVGNumber: false;
            SVGNumberList: false;
            SVGPathElement: false;
            SVGPatternElement: false;
            SVGPoint: false;
            SVGPointList: false;
            SVGPolygonElement: false;
            SVGPolylineElement: false;
            SVGPreserveAspectRatio: false;
            SVGRadialGradientElement: false;
            SVGRect: false;
            SVGRectElement: false;
            SVGScriptElement: false;
            SVGSetElement: false;
            SVGStopElement: false;
            SVGStringList: false;
            SVGStyleElement: false;
            SVGSVGElement: false;
            SVGSwitchElement: false;
            SVGSymbolElement: false;
            SVGTextContentElement: false;
            SVGTextElement: false;
            SVGTextPathElement: false;
            SVGTextPositioningElement: false;
            SVGTitleElement: false;
            SVGTransform: false;
            SVGTransformList: false;
            SVGTSpanElement: false;
            SVGUnitTypes: false;
            SVGUseElement: false;
            SVGViewElement: false;
            SyncManager: false;
            TaskAttributionTiming: false;
            TaskController: false;
            TaskPriorityChangeEvent: false;
            TaskSignal: false;
            TEMPORARY: false;
            Text: false;
            TextDecoder: false;
            TextDecoderStream: false;
            TextEncoder: false;
            TextEncoderStream: false;
            TextEvent: false;
            TextFormat: false;
            TextFormatUpdateEvent: false;
            TextMetrics: false;
            TextTrack: false;
            TextTrackCue: false;
            TextTrackCueList: false;
            TextTrackList: false;
            TextUpdateEvent: false;
            TimeEvent: false;
            TimeRanges: false;
            ToggleEvent: false;
            toolbar: false;
            top: false;
            Touch: false;
            TouchEvent: false;
            TouchList: false;
            TrackEvent: false;
            TransformStream: false;
            TransformStreamDefaultController: false;
            TransitionEvent: false;
            TreeWalker: false;
            TrustedHTML: false;
            TrustedScript: false;
            TrustedScriptURL: false;
            TrustedTypePolicy: false;
            TrustedTypePolicyFactory: false;
            trustedTypes: false;
            UIEvent: false;
            URL: false;
            URLPattern: false;
            URLSearchParams: false;
            USB: false;
            USBAlternateInterface: false;
            USBConfiguration: false;
            USBConnectionEvent: false;
            USBDevice: false;
            USBEndpoint: false;
            USBInterface: false;
            USBInTransferResult: false;
            USBIsochronousInTransferPacket: false;
            USBIsochronousInTransferResult: false;
            USBIsochronousOutTransferPacket: false;
            USBIsochronousOutTransferResult: false;
            USBOutTransferResult: false;
            UserActivation: false;
            ValidityState: false;
            VideoColorSpace: false;
            VideoDecoder: false;
            VideoEncoder: false;
            VideoFrame: false;
            VideoPlaybackQuality: false;
            ViewTimeline: false;
            ViewTransition: false;
            ViewTransitionTypeSet: false;
            VirtualKeyboard: false;
            VirtualKeyboardGeometryChangeEvent: false;
            VisibilityStateEntry: false;
            visualViewport: false;
            VisualViewport: false;
            VTTCue: false;
            VTTRegion: false;
            WakeLock: false;
            WakeLockSentinel: false;
            WaveShaperNode: false;
            WebAssembly: false;
            WebGL2RenderingContext: false;
            WebGLActiveInfo: false;
            WebGLBuffer: false;
            WebGLContextEvent: false;
            WebGLFramebuffer: false;
            WebGLObject: false;
            WebGLProgram: false;
            WebGLQuery: false;
            WebGLRenderbuffer: false;
            WebGLRenderingContext: false;
            WebGLSampler: false;
            WebGLShader: false;
            WebGLShaderPrecisionFormat: false;
            WebGLSync: false;
            WebGLTexture: false;
            WebGLTransformFeedback: false;
            WebGLUniformLocation: false;
            WebGLVertexArrayObject: false;
            WebSocket: false;
            WebSocketError: false;
            WebSocketStream: false;
            WebTransport: false;
            WebTransportBidirectionalStream: false;
            WebTransportDatagramDuplexStream: false;
            WebTransportError: false;
            WebTransportReceiveStream: false;
            WebTransportSendStream: false;
            WGSLLanguageFeatures: false;
            WheelEvent: false;
            window: false;
            Window: false;
            WindowControlsOverlay: false;
            WindowControlsOverlayGeometryChangeEvent: false;
            Worker: false;
            Worklet: false;
            WorkletGlobalScope: false;
            WritableStream: false;
            WritableStreamDefaultController: false;
            WritableStreamDefaultWriter: false;
            XMLDocument: false;
            XMLHttpRequest: false;
            XMLHttpRequestEventTarget: false;
            XMLHttpRequestUpload: false;
            XMLSerializer: false;
            XPathEvaluator: false;
            XPathExpression: false;
            XPathResult: false;
            XRAnchor: false;
            XRAnchorSet: false;
            XRBoundedReferenceSpace: false;
            XRCamera: false;
            XRCPUDepthInformation: false;
            XRDepthInformation: false;
            XRDOMOverlayState: false;
            XRFrame: false;
            XRHand: false;
            XRHitTestResult: false;
            XRHitTestSource: false;
            XRInputSource: false;
            XRInputSourceArray: false;
            XRInputSourceEvent: false;
            XRInputSourcesChangeEvent: false;
            XRJointPose: false;
            XRJointSpace: false;
            XRLayer: false;
            XRLightEstimate: false;
            XRLightProbe: false;
            XRPose: false;
            XRRay: false;
            XRReferenceSpace: false;
            XRReferenceSpaceEvent: false;
            XRRenderState: false;
            XRRigidTransform: false;
            XRSession: false;
            XRSessionEvent: false;
            XRSpace: false;
            XRSystem: false;
            XRTransientInputHitTestResult: false;
            XRTransientInputHitTestSource: false;
            XRView: false;
            XRViewerPose: false;
            XRViewport: false;
            XRWebGLBinding: false;
            XRWebGLDepthInformation: false;
            XRWebGLLayer: false;
            XSLTProcessor: false;
            __dirname: false;
            __filename: false;
            Buffer: false;
            clearImmediate: false;
            exports: true;
            global: false;
            module: false;
            process: false;
            require: false;
            setImmediate: false;
        };
    };
    rules: {
        'no-console': string;
        'no-debugger': string;
        'no-alert': string;
        'perfectionist/sort-imports': (string | {
            internalPattern: string[];
        })[];
    };
}[];

export declare const default_alias_3: ({
    languageOptions: {
        globals: {
            AbortController: false;
            AbortSignal: false;
            AbsoluteOrientationSensor: false;
            AbstractRange: false;
            Accelerometer: false;
            addEventListener: false;
            ai: false;
            AI: false;
            AITextSession: false;
            alert: false;
            AnalyserNode: false;
            Animation: false;
            AnimationEffect: false;
            AnimationEvent: false;
            AnimationPlaybackEvent: false;
            AnimationTimeline: false;
            atob: false;
            Attr: false;
            Audio: false;
            AudioBuffer: false;
            AudioBufferSourceNode: false;
            AudioContext: false;
            AudioData: false;
            AudioDecoder: false;
            AudioDestinationNode: false;
            AudioEncoder: false;
            AudioListener: false;
            AudioNode: false;
            AudioParam: false;
            AudioParamMap: false;
            AudioProcessingEvent: false;
            AudioScheduledSourceNode: false;
            AudioSinkInfo: false;
            AudioWorklet: false;
            AudioWorkletGlobalScope: false;
            AudioWorkletNode: false;
            AudioWorkletProcessor: false;
            AuthenticatorAssertionResponse: false;
            AuthenticatorAttestationResponse: false;
            AuthenticatorResponse: false;
            BackgroundFetchManager: false;
            BackgroundFetchRecord: false;
            BackgroundFetchRegistration: false;
            BarcodeDetector: false;
            BarProp: false;
            BaseAudioContext: false;
            BatteryManager: false;
            BeforeUnloadEvent: false;
            BiquadFilterNode: false;
            Blob: false;
            BlobEvent: false;
            Bluetooth: false;
            BluetoothCharacteristicProperties: false;
            BluetoothDevice: false;
            BluetoothRemoteGATTCharacteristic: false;
            BluetoothRemoteGATTDescriptor: false;
            BluetoothRemoteGATTServer: false;
            BluetoothRemoteGATTService: false;
            BluetoothUUID: false;
            blur: false;
            BroadcastChannel: false;
            BrowserCaptureMediaStreamTrack: false;
            btoa: false;
            ByteLengthQueuingStrategy: false;
            Cache: false;
            caches: false;
            CacheStorage: false;
            cancelAnimationFrame: false;
            cancelIdleCallback: false;
            CanvasCaptureMediaStream: false;
            CanvasCaptureMediaStreamTrack: false;
            CanvasGradient: false;
            CanvasPattern: false;
            CanvasRenderingContext2D: false;
            CaptureController: false;
            CaretPosition: false;
            CDATASection: false;
            ChannelMergerNode: false;
            ChannelSplitterNode: false;
            ChapterInformation: false;
            CharacterBoundsUpdateEvent: false;
            CharacterData: false;
            clearInterval: false;
            clearTimeout: false;
            clientInformation: false;
            Clipboard: false;
            ClipboardEvent: false;
            ClipboardItem: false;
            close: false;
            closed: false;
            CloseEvent: false;
            CloseWatcher: false;
            Comment: false;
            CompositionEvent: false;
            CompressionStream: false;
            confirm: false;
            console: false;
            ConstantSourceNode: false;
            ContentVisibilityAutoStateChangeEvent: false;
            ConvolverNode: false;
            CookieChangeEvent: false;
            CookieDeprecationLabel: false;
            cookieStore: false;
            CookieStore: false;
            CookieStoreManager: false;
            CountQueuingStrategy: false;
            createImageBitmap: false;
            Credential: false;
            credentialless: false;
            CredentialsContainer: false;
            CropTarget: false;
            crossOriginIsolated: false;
            crypto: false;
            Crypto: false;
            CryptoKey: false;
            CSS: false;
            CSSAnimation: false;
            CSSConditionRule: false;
            CSSContainerRule: false;
            CSSCounterStyleRule: false;
            CSSFontFaceRule: false;
            CSSFontFeatureValuesRule: false;
            CSSFontPaletteValuesRule: false;
            CSSGroupingRule: false;
            CSSImageValue: false;
            CSSImportRule: false;
            CSSKeyframeRule: false;
            CSSKeyframesRule: false;
            CSSKeywordValue: false;
            CSSLayerBlockRule: false;
            CSSLayerStatementRule: false;
            CSSMarginRule: false;
            CSSMathClamp: false;
            CSSMathInvert: false;
            CSSMathMax: false;
            CSSMathMin: false;
            CSSMathNegate: false;
            CSSMathProduct: false;
            CSSMathSum: false;
            CSSMathValue: false;
            CSSMatrixComponent: false;
            CSSMediaRule: false;
            CSSNamespaceRule: false;
            CSSNestedDeclarations: false;
            CSSNumericArray: false;
            CSSNumericValue: false;
            CSSPageDescriptors: false;
            CSSPageRule: false;
            CSSPerspective: false;
            CSSPositionTryDescriptors: false;
            CSSPositionTryRule: false;
            CSSPositionValue: false;
            CSSPropertyRule: false;
            CSSRotate: false;
            CSSRule: false;
            CSSRuleList: false;
            CSSScale: false;
            CSSScopeRule: false;
            CSSSkew: false;
            CSSSkewX: false;
            CSSSkewY: false;
            CSSStartingStyleRule: false;
            CSSStyleDeclaration: false;
            CSSStyleRule: false;
            CSSStyleSheet: false;
            CSSStyleValue: false;
            CSSSupportsRule: false;
            CSSTransformComponent: false;
            CSSTransformValue: false;
            CSSTransition: false;
            CSSTranslate: false;
            CSSUnitValue: false;
            CSSUnparsedValue: false;
            CSSVariableReferenceValue: false;
            CSSViewTransitionRule: false;
            currentFrame: false;
            currentTime: false;
            CustomElementRegistry: false;
            customElements: false;
            CustomEvent: false;
            CustomStateSet: false;
            DataTransfer: false;
            DataTransferItem: false;
            DataTransferItemList: false;
            DecompressionStream: false;
            DelayNode: false;
            DelegatedInkTrailPresenter: false;
            DeviceMotionEvent: false;
            DeviceMotionEventAcceleration: false;
            DeviceMotionEventRotationRate: false;
            DeviceOrientationEvent: false;
            devicePixelRatio: false;
            dispatchEvent: false;
            document: false;
            Document: false;
            DocumentFragment: false;
            documentPictureInPicture: false;
            DocumentPictureInPicture: false;
            DocumentPictureInPictureEvent: false;
            DocumentTimeline: false;
            DocumentType: false;
            DOMError: false;
            DOMException: false;
            DOMImplementation: false;
            DOMMatrix: false;
            DOMMatrixReadOnly: false;
            DOMParser: false;
            DOMPoint: false;
            DOMPointReadOnly: false;
            DOMQuad: false;
            DOMRect: false;
            DOMRectList: false;
            DOMRectReadOnly: false;
            DOMStringList: false;
            DOMStringMap: false;
            DOMTokenList: false;
            DragEvent: false;
            DynamicsCompressorNode: false;
            EditContext: false;
            Element: false;
            ElementInternals: false;
            EncodedAudioChunk: false;
            EncodedVideoChunk: false;
            ErrorEvent: false;
            event: false;
            Event: false;
            EventCounts: false;
            EventSource: false;
            EventTarget: false;
            external: false;
            External: false;
            EyeDropper: false;
            FeaturePolicy: false;
            FederatedCredential: false;
            fence: false;
            Fence: false;
            FencedFrameConfig: false;
            fetch: false;
            fetchLater: false;
            FetchLaterResult: false;
            File: false;
            FileList: false;
            FileReader: false;
            FileSystem: false;
            FileSystemDirectoryEntry: false;
            FileSystemDirectoryHandle: false;
            FileSystemDirectoryReader: false;
            FileSystemEntry: false;
            FileSystemFileEntry: false;
            FileSystemFileHandle: false;
            FileSystemHandle: false;
            FileSystemWritableFileStream: false;
            find: false;
            Float16Array: false;
            focus: false;
            FocusEvent: false;
            FontData: false;
            FontFace: false;
            FontFaceSet: false;
            FontFaceSetLoadEvent: false;
            FormData: false;
            FormDataEvent: false;
            FragmentDirective: false;
            frameElement: false;
            frames: false;
            GainNode: false;
            Gamepad: false;
            GamepadAxisMoveEvent: false;
            GamepadButton: false;
            GamepadButtonEvent: false;
            GamepadEvent: false;
            GamepadHapticActuator: false;
            GamepadPose: false;
            Geolocation: false;
            GeolocationCoordinates: false;
            GeolocationPosition: false;
            GeolocationPositionError: false;
            getComputedStyle: false;
            getScreenDetails: false;
            getSelection: false;
            GPU: false;
            GPUAdapter: false;
            GPUAdapterInfo: false;
            GPUBindGroup: false;
            GPUBindGroupLayout: false;
            GPUBuffer: false;
            GPUBufferUsage: false;
            GPUCanvasContext: false;
            GPUColorWrite: false;
            GPUCommandBuffer: false;
            GPUCommandEncoder: false;
            GPUCompilationInfo: false;
            GPUCompilationMessage: false;
            GPUComputePassEncoder: false;
            GPUComputePipeline: false;
            GPUDevice: false;
            GPUDeviceLostInfo: false;
            GPUError: false;
            GPUExternalTexture: false;
            GPUInternalError: false;
            GPUMapMode: false;
            GPUOutOfMemoryError: false;
            GPUPipelineError: false;
            GPUPipelineLayout: false;
            GPUQuerySet: false;
            GPUQueue: false;
            GPURenderBundle: false;
            GPURenderBundleEncoder: false;
            GPURenderPassEncoder: false;
            GPURenderPipeline: false;
            GPUSampler: false;
            GPUShaderModule: false;
            GPUShaderStage: false;
            GPUSupportedFeatures: false;
            GPUSupportedLimits: false;
            GPUTexture: false;
            GPUTextureUsage: false;
            GPUTextureView: false;
            GPUUncapturedErrorEvent: false;
            GPUValidationError: false;
            GravitySensor: false;
            Gyroscope: false;
            HashChangeEvent: false;
            Headers: false;
            HID: false;
            HIDConnectionEvent: false;
            HIDDevice: false;
            HIDInputReportEvent: false;
            Highlight: false;
            HighlightRegistry: false;
            history: false;
            History: false;
            HTMLAllCollection: false;
            HTMLAnchorElement: false;
            HTMLAreaElement: false;
            HTMLAudioElement: false;
            HTMLBaseElement: false;
            HTMLBodyElement: false;
            HTMLBRElement: false;
            HTMLButtonElement: false;
            HTMLCanvasElement: false;
            HTMLCollection: false;
            HTMLDataElement: false;
            HTMLDataListElement: false;
            HTMLDetailsElement: false;
            HTMLDialogElement: false;
            HTMLDirectoryElement: false;
            HTMLDivElement: false;
            HTMLDListElement: false;
            HTMLDocument: false;
            HTMLElement: false;
            HTMLEmbedElement: false;
            HTMLFencedFrameElement: false;
            HTMLFieldSetElement: false;
            HTMLFontElement: false;
            HTMLFormControlsCollection: false;
            HTMLFormElement: false;
            HTMLFrameElement: false;
            HTMLFrameSetElement: false;
            HTMLHeadElement: false;
            HTMLHeadingElement: false;
            HTMLHRElement: false;
            HTMLHtmlElement: false;
            HTMLIFrameElement: false;
            HTMLImageElement: false;
            HTMLInputElement: false;
            HTMLLabelElement: false;
            HTMLLegendElement: false;
            HTMLLIElement: false;
            HTMLLinkElement: false;
            HTMLMapElement: false;
            HTMLMarqueeElement: false;
            HTMLMediaElement: false;
            HTMLMenuElement: false;
            HTMLMetaElement: false;
            HTMLMeterElement: false;
            HTMLModElement: false;
            HTMLObjectElement: false;
            HTMLOListElement: false;
            HTMLOptGroupElement: false;
            HTMLOptionElement: false;
            HTMLOptionsCollection: false;
            HTMLOutputElement: false;
            HTMLParagraphElement: false;
            HTMLParamElement: false;
            HTMLPictureElement: false;
            HTMLPreElement: false;
            HTMLProgressElement: false;
            HTMLQuoteElement: false;
            HTMLScriptElement: false;
            HTMLSelectElement: false;
            HTMLSlotElement: false;
            HTMLSourceElement: false;
            HTMLSpanElement: false;
            HTMLStyleElement: false;
            HTMLTableCaptionElement: false;
            HTMLTableCellElement: false;
            HTMLTableColElement: false;
            HTMLTableElement: false;
            HTMLTableRowElement: false;
            HTMLTableSectionElement: false;
            HTMLTemplateElement: false;
            HTMLTextAreaElement: false;
            HTMLTimeElement: false;
            HTMLTitleElement: false;
            HTMLTrackElement: false;
            HTMLUListElement: false;
            HTMLUnknownElement: false;
            HTMLVideoElement: false;
            IDBCursor: false;
            IDBCursorWithValue: false;
            IDBDatabase: false;
            IDBFactory: false;
            IDBIndex: false;
            IDBKeyRange: false;
            IDBObjectStore: false;
            IDBOpenDBRequest: false;
            IDBRequest: false;
            IDBTransaction: false;
            IDBVersionChangeEvent: false;
            IdentityCredential: false;
            IdentityCredentialError: false;
            IdentityProvider: false;
            IdleDeadline: false;
            IdleDetector: false;
            IIRFilterNode: false;
            Image: false;
            ImageBitmap: false;
            ImageBitmapRenderingContext: false;
            ImageCapture: false;
            ImageData: false;
            ImageDecoder: false;
            ImageTrack: false;
            ImageTrackList: false;
            indexedDB: false;
            Ink: false;
            innerHeight: false;
            innerWidth: false;
            InputDeviceCapabilities: false;
            InputDeviceInfo: false;
            InputEvent: false;
            IntersectionObserver: false;
            IntersectionObserverEntry: false;
            isSecureContext: false;
            Keyboard: false;
            KeyboardEvent: false;
            KeyboardLayoutMap: false;
            KeyframeEffect: false;
            LargestContentfulPaint: false;
            LaunchParams: false;
            launchQueue: false;
            LaunchQueue: false;
            LayoutShift: false;
            LayoutShiftAttribution: false;
            length: false;
            LinearAccelerationSensor: false;
            localStorage: false;
            location: true;
            Location: false;
            locationbar: false;
            Lock: false;
            LockManager: false;
            matchMedia: false;
            MathMLElement: false;
            MediaCapabilities: false;
            MediaCapabilitiesInfo: false;
            MediaDeviceInfo: false;
            MediaDevices: false;
            MediaElementAudioSourceNode: false;
            MediaEncryptedEvent: false;
            MediaError: false;
            MediaKeyError: false;
            MediaKeyMessageEvent: false;
            MediaKeys: false;
            MediaKeySession: false;
            MediaKeyStatusMap: false;
            MediaKeySystemAccess: false;
            MediaList: false;
            MediaMetadata: false;
            MediaQueryList: false;
            MediaQueryListEvent: false;
            MediaRecorder: false;
            MediaRecorderErrorEvent: false;
            MediaSession: false;
            MediaSource: false;
            MediaSourceHandle: false;
            MediaStream: false;
            MediaStreamAudioDestinationNode: false;
            MediaStreamAudioSourceNode: false;
            MediaStreamEvent: false;
            MediaStreamTrack: false;
            MediaStreamTrackAudioSourceNode: false;
            MediaStreamTrackAudioStats: false;
            MediaStreamTrackEvent: false;
            MediaStreamTrackGenerator: false;
            MediaStreamTrackProcessor: false;
            MediaStreamTrackVideoStats: false;
            menubar: false;
            MessageChannel: false;
            MessageEvent: false;
            MessagePort: false;
            MIDIAccess: false;
            MIDIConnectionEvent: false;
            MIDIInput: false;
            MIDIInputMap: false;
            MIDIMessageEvent: false;
            MIDIOutput: false;
            MIDIOutputMap: false;
            MIDIPort: false;
            MimeType: false;
            MimeTypeArray: false;
            model: false;
            ModelGenericSession: false;
            ModelManager: false;
            MouseEvent: false;
            moveBy: false;
            moveTo: false;
            MutationEvent: false;
            MutationObserver: false;
            MutationRecord: false;
            name: false;
            NamedNodeMap: false;
            NavigateEvent: false;
            navigation: false;
            Navigation: false;
            NavigationActivation: false;
            NavigationCurrentEntryChangeEvent: false;
            NavigationDestination: false;
            NavigationHistoryEntry: false;
            NavigationPreloadManager: false;
            NavigationTransition: false;
            navigator: false;
            Navigator: false;
            NavigatorLogin: false;
            NavigatorManagedData: false;
            NavigatorUAData: false;
            NetworkInformation: false;
            Node: false;
            NodeFilter: false;
            NodeIterator: false;
            NodeList: false;
            Notification: false;
            NotifyPaintEvent: false;
            NotRestoredReasonDetails: false;
            NotRestoredReasons: false;
            OfflineAudioCompletionEvent: false;
            OfflineAudioContext: false;
            offscreenBuffering: false;
            OffscreenCanvas: false;
            OffscreenCanvasRenderingContext2D: false;
            onabort: true;
            onafterprint: true;
            onanimationcancel: true;
            onanimationend: true;
            onanimationiteration: true;
            onanimationstart: true;
            onappinstalled: true;
            onauxclick: true;
            onbeforeinput: true;
            onbeforeinstallprompt: true;
            onbeforematch: true;
            onbeforeprint: true;
            onbeforetoggle: true;
            onbeforeunload: true;
            onbeforexrselect: true;
            onblur: true;
            oncancel: true;
            oncanplay: true;
            oncanplaythrough: true;
            onchange: true;
            onclick: true;
            onclose: true;
            oncontentvisibilityautostatechange: true;
            oncontextlost: true;
            oncontextmenu: true;
            oncontextrestored: true;
            oncopy: true;
            oncuechange: true;
            oncut: true;
            ondblclick: true;
            ondevicemotion: true;
            ondeviceorientation: true;
            ondeviceorientationabsolute: true;
            ondrag: true;
            ondragend: true;
            ondragenter: true;
            ondragleave: true;
            ondragover: true;
            ondragstart: true;
            ondrop: true;
            ondurationchange: true;
            onemptied: true;
            onended: true;
            onerror: true;
            onfocus: true;
            onformdata: true;
            ongamepadconnected: true;
            ongamepaddisconnected: true;
            ongotpointercapture: true;
            onhashchange: true;
            oninput: true;
            oninvalid: true;
            onkeydown: true;
            onkeypress: true;
            onkeyup: true;
            onlanguagechange: true;
            onload: true;
            onloadeddata: true;
            onloadedmetadata: true;
            onloadstart: true;
            onlostpointercapture: true;
            onmessage: true;
            onmessageerror: true;
            onmousedown: true;
            onmouseenter: true;
            onmouseleave: true;
            onmousemove: true;
            onmouseout: true;
            onmouseover: true;
            onmouseup: true;
            onmousewheel: true;
            onoffline: true;
            ononline: true;
            onpagehide: true;
            onpagereveal: true;
            onpageshow: true;
            onpageswap: true;
            onpaste: true;
            onpause: true;
            onplay: true;
            onplaying: true;
            onpointercancel: true;
            onpointerdown: true;
            onpointerenter: true;
            onpointerleave: true;
            onpointermove: true;
            onpointerout: true;
            onpointerover: true;
            onpointerrawupdate: true;
            onpointerup: true;
            onpopstate: true;
            onprogress: true;
            onratechange: true;
            onrejectionhandled: true;
            onreset: true;
            onresize: true;
            onscroll: true;
            onscrollend: true;
            onscrollsnapchange: true;
            onscrollsnapchanging: true;
            onsearch: true;
            onsecuritypolicyviolation: true;
            onseeked: true;
            onseeking: true;
            onselect: true;
            onselectionchange: true;
            onselectstart: true;
            onslotchange: true;
            onstalled: true;
            onstorage: true;
            onsubmit: true;
            onsuspend: true;
            ontimeupdate: true;
            ontoggle: true;
            ontransitioncancel: true;
            ontransitionend: true;
            ontransitionrun: true;
            ontransitionstart: true;
            onunhandledrejection: true;
            onunload: true;
            onvolumechange: true;
            onwaiting: true;
            onwheel: true;
            open: false;
            opener: false;
            Option: false;
            OrientationSensor: false;
            origin: false;
            originAgentCluster: false;
            OscillatorNode: false;
            OTPCredential: false;
            outerHeight: false;
            outerWidth: false;
            OverconstrainedError: false;
            PageRevealEvent: false;
            PageSwapEvent: false;
            PageTransitionEvent: false;
            pageXOffset: false;
            pageYOffset: false;
            PannerNode: false;
            parent: false;
            PasswordCredential: false;
            Path2D: false;
            PaymentAddress: false;
            PaymentManager: false;
            PaymentMethodChangeEvent: false;
            PaymentRequest: false;
            PaymentRequestUpdateEvent: false;
            PaymentResponse: false;
            performance: false;
            Performance: false;
            PerformanceElementTiming: false;
            PerformanceEntry: false;
            PerformanceEventTiming: false;
            PerformanceLongAnimationFrameTiming: false;
            PerformanceLongTaskTiming: false;
            PerformanceMark: false;
            PerformanceMeasure: false;
            PerformanceNavigation: false;
            PerformanceNavigationTiming: false;
            PerformanceObserver: false;
            PerformanceObserverEntryList: false;
            PerformancePaintTiming: false;
            PerformanceResourceTiming: false;
            PerformanceScriptTiming: false;
            PerformanceServerTiming: false;
            PerformanceTiming: false;
            PeriodicSyncManager: false;
            PeriodicWave: false;
            Permissions: false;
            PermissionStatus: false;
            PERSISTENT: false;
            personalbar: false;
            PictureInPictureEvent: false;
            PictureInPictureWindow: false;
            Plugin: false;
            PluginArray: false;
            PointerEvent: false;
            PopStateEvent: false;
            postMessage: false;
            Presentation: false;
            PresentationAvailability: false;
            PresentationConnection: false;
            PresentationConnectionAvailableEvent: false;
            PresentationConnectionCloseEvent: false;
            PresentationConnectionList: false;
            PresentationReceiver: false;
            PresentationRequest: false;
            PressureObserver: false;
            PressureRecord: false;
            print: false;
            ProcessingInstruction: false;
            Profiler: false;
            ProgressEvent: false;
            PromiseRejectionEvent: false;
            prompt: false;
            ProtectedAudience: false;
            PublicKeyCredential: false;
            PushManager: false;
            PushSubscription: false;
            PushSubscriptionOptions: false;
            queryLocalFonts: false;
            queueMicrotask: false;
            RadioNodeList: false;
            Range: false;
            ReadableByteStreamController: false;
            ReadableStream: false;
            ReadableStreamBYOBReader: false;
            ReadableStreamBYOBRequest: false;
            ReadableStreamDefaultController: false;
            ReadableStreamDefaultReader: false;
            registerProcessor: false;
            RelativeOrientationSensor: false;
            RemotePlayback: false;
            removeEventListener: false;
            reportError: false;
            ReportingObserver: false;
            Request: false;
            requestAnimationFrame: false;
            requestIdleCallback: false;
            resizeBy: false;
            ResizeObserver: false;
            ResizeObserverEntry: false;
            ResizeObserverSize: false;
            resizeTo: false;
            Response: false;
            RTCCertificate: false;
            RTCDataChannel: false;
            RTCDataChannelEvent: false;
            RTCDtlsTransport: false;
            RTCDTMFSender: false;
            RTCDTMFToneChangeEvent: false;
            RTCEncodedAudioFrame: false;
            RTCEncodedVideoFrame: false;
            RTCError: false;
            RTCErrorEvent: false;
            RTCIceCandidate: false;
            RTCIceTransport: false;
            RTCPeerConnection: false;
            RTCPeerConnectionIceErrorEvent: false;
            RTCPeerConnectionIceEvent: false;
            RTCRtpReceiver: false;
            RTCRtpScriptTransform: false;
            RTCRtpSender: false;
            RTCRtpTransceiver: false;
            RTCSctpTransport: false;
            RTCSessionDescription: false;
            RTCStatsReport: false;
            RTCTrackEvent: false;
            sampleRate: false;
            scheduler: false;
            Scheduler: false;
            Scheduling: false;
            screen: false;
            Screen: false;
            ScreenDetailed: false;
            ScreenDetails: false;
            screenLeft: false;
            ScreenOrientation: false;
            screenTop: false;
            screenX: false;
            screenY: false;
            ScriptProcessorNode: false;
            scroll: false;
            scrollbars: false;
            scrollBy: false;
            ScrollTimeline: false;
            scrollTo: false;
            scrollX: false;
            scrollY: false;
            SecurityPolicyViolationEvent: false;
            Selection: false;
            self: false;
            Sensor: false;
            SensorErrorEvent: false;
            Serial: false;
            SerialPort: false;
            ServiceWorker: false;
            ServiceWorkerContainer: false;
            ServiceWorkerRegistration: false;
            sessionStorage: false;
            setInterval: false;
            setTimeout: false;
            ShadowRoot: false;
            sharedStorage: false;
            SharedStorage: false;
            SharedStorageWorklet: false;
            SharedWorker: false;
            showDirectoryPicker: false;
            showOpenFilePicker: false;
            showSaveFilePicker: false;
            SnapEvent: false;
            SourceBuffer: false;
            SourceBufferList: false;
            speechSynthesis: false;
            SpeechSynthesis: false;
            SpeechSynthesisErrorEvent: false;
            SpeechSynthesisEvent: false;
            SpeechSynthesisUtterance: false;
            SpeechSynthesisVoice: false;
            StaticRange: false;
            status: false;
            statusbar: false;
            StereoPannerNode: false;
            stop: false;
            Storage: false;
            StorageBucket: false;
            StorageBucketManager: false;
            StorageEvent: false;
            StorageManager: false;
            structuredClone: false;
            styleMedia: false;
            StylePropertyMap: false;
            StylePropertyMapReadOnly: false;
            StyleSheet: false;
            StyleSheetList: false;
            SubmitEvent: false;
            SubtleCrypto: false;
            SVGAElement: false;
            SVGAngle: false;
            SVGAnimatedAngle: false;
            SVGAnimatedBoolean: false;
            SVGAnimatedEnumeration: false;
            SVGAnimatedInteger: false;
            SVGAnimatedLength: false;
            SVGAnimatedLengthList: false;
            SVGAnimatedNumber: false;
            SVGAnimatedNumberList: false;
            SVGAnimatedPreserveAspectRatio: false;
            SVGAnimatedRect: false;
            SVGAnimatedString: false;
            SVGAnimatedTransformList: false;
            SVGAnimateElement: false;
            SVGAnimateMotionElement: false;
            SVGAnimateTransformElement: false;
            SVGAnimationElement: false;
            SVGCircleElement: false;
            SVGClipPathElement: false;
            SVGComponentTransferFunctionElement: false;
            SVGDefsElement: false;
            SVGDescElement: false;
            SVGElement: false;
            SVGEllipseElement: false;
            SVGFEBlendElement: false;
            SVGFEColorMatrixElement: false;
            SVGFEComponentTransferElement: false;
            SVGFECompositeElement: false;
            SVGFEConvolveMatrixElement: false;
            SVGFEDiffuseLightingElement: false;
            SVGFEDisplacementMapElement: false;
            SVGFEDistantLightElement: false;
            SVGFEDropShadowElement: false;
            SVGFEFloodElement: false;
            SVGFEFuncAElement: false;
            SVGFEFuncBElement: false;
            SVGFEFuncGElement: false;
            SVGFEFuncRElement: false;
            SVGFEGaussianBlurElement: false;
            SVGFEImageElement: false;
            SVGFEMergeElement: false;
            SVGFEMergeNodeElement: false;
            SVGFEMorphologyElement: false;
            SVGFEOffsetElement: false;
            SVGFEPointLightElement: false;
            SVGFESpecularLightingElement: false;
            SVGFESpotLightElement: false;
            SVGFETileElement: false;
            SVGFETurbulenceElement: false;
            SVGFilterElement: false;
            SVGForeignObjectElement: false;
            SVGGElement: false;
            SVGGeometryElement: false;
            SVGGradientElement: false;
            SVGGraphicsElement: false;
            SVGImageElement: false;
            SVGLength: false;
            SVGLengthList: false;
            SVGLinearGradientElement: false;
            SVGLineElement: false;
            SVGMarkerElement: false;
            SVGMaskElement: false;
            SVGMatrix: false;
            SVGMetadataElement: false;
            SVGMPathElement: false;
            SVGNumber: false;
            SVGNumberList: false;
            SVGPathElement: false;
            SVGPatternElement: false;
            SVGPoint: false;
            SVGPointList: false;
            SVGPolygonElement: false;
            SVGPolylineElement: false;
            SVGPreserveAspectRatio: false;
            SVGRadialGradientElement: false;
            SVGRect: false;
            SVGRectElement: false;
            SVGScriptElement: false;
            SVGSetElement: false;
            SVGStopElement: false;
            SVGStringList: false;
            SVGStyleElement: false;
            SVGSVGElement: false;
            SVGSwitchElement: false;
            SVGSymbolElement: false;
            SVGTextContentElement: false;
            SVGTextElement: false;
            SVGTextPathElement: false;
            SVGTextPositioningElement: false;
            SVGTitleElement: false;
            SVGTransform: false;
            SVGTransformList: false;
            SVGTSpanElement: false;
            SVGUnitTypes: false;
            SVGUseElement: false;
            SVGViewElement: false;
            SyncManager: false;
            TaskAttributionTiming: false;
            TaskController: false;
            TaskPriorityChangeEvent: false;
            TaskSignal: false;
            TEMPORARY: false;
            Text: false;
            TextDecoder: false;
            TextDecoderStream: false;
            TextEncoder: false;
            TextEncoderStream: false;
            TextEvent: false;
            TextFormat: false;
            TextFormatUpdateEvent: false;
            TextMetrics: false;
            TextTrack: false;
            TextTrackCue: false;
            TextTrackCueList: false;
            TextTrackList: false;
            TextUpdateEvent: false;
            TimeEvent: false;
            TimeRanges: false;
            ToggleEvent: false;
            toolbar: false;
            top: false;
            Touch: false;
            TouchEvent: false;
            TouchList: false;
            TrackEvent: false;
            TransformStream: false;
            TransformStreamDefaultController: false;
            TransitionEvent: false;
            TreeWalker: false;
            TrustedHTML: false;
            TrustedScript: false;
            TrustedScriptURL: false;
            TrustedTypePolicy: false;
            TrustedTypePolicyFactory: false;
            trustedTypes: false;
            UIEvent: false;
            URL: false;
            URLPattern: false;
            URLSearchParams: false;
            USB: false;
            USBAlternateInterface: false;
            USBConfiguration: false;
            USBConnectionEvent: false;
            USBDevice: false;
            USBEndpoint: false;
            USBInterface: false;
            USBInTransferResult: false;
            USBIsochronousInTransferPacket: false;
            USBIsochronousInTransferResult: false;
            USBIsochronousOutTransferPacket: false;
            USBIsochronousOutTransferResult: false;
            USBOutTransferResult: false;
            UserActivation: false;
            ValidityState: false;
            VideoColorSpace: false;
            VideoDecoder: false;
            VideoEncoder: false;
            VideoFrame: false;
            VideoPlaybackQuality: false;
            ViewTimeline: false;
            ViewTransition: false;
            ViewTransitionTypeSet: false;
            VirtualKeyboard: false;
            VirtualKeyboardGeometryChangeEvent: false;
            VisibilityStateEntry: false;
            visualViewport: false;
            VisualViewport: false;
            VTTCue: false;
            VTTRegion: false;
            WakeLock: false;
            WakeLockSentinel: false;
            WaveShaperNode: false;
            WebAssembly: false;
            WebGL2RenderingContext: false;
            WebGLActiveInfo: false;
            WebGLBuffer: false;
            WebGLContextEvent: false;
            WebGLFramebuffer: false;
            WebGLObject: false;
            WebGLProgram: false;
            WebGLQuery: false;
            WebGLRenderbuffer: false;
            WebGLRenderingContext: false;
            WebGLSampler: false;
            WebGLShader: false;
            WebGLShaderPrecisionFormat: false;
            WebGLSync: false;
            WebGLTexture: false;
            WebGLTransformFeedback: false;
            WebGLUniformLocation: false;
            WebGLVertexArrayObject: false;
            WebSocket: false;
            WebSocketError: false;
            WebSocketStream: false;
            WebTransport: false;
            WebTransportBidirectionalStream: false;
            WebTransportDatagramDuplexStream: false;
            WebTransportError: false;
            WebTransportReceiveStream: false;
            WebTransportSendStream: false;
            WGSLLanguageFeatures: false;
            WheelEvent: false;
            window: false;
            Window: false;
            WindowControlsOverlay: false;
            WindowControlsOverlayGeometryChangeEvent: false;
            Worker: false;
            Worklet: false;
            WorkletGlobalScope: false;
            WritableStream: false;
            WritableStreamDefaultController: false;
            WritableStreamDefaultWriter: false;
            XMLDocument: false;
            XMLHttpRequest: false;
            XMLHttpRequestEventTarget: false;
            XMLHttpRequestUpload: false;
            XMLSerializer: false;
            XPathEvaluator: false;
            XPathExpression: false;
            XPathResult: false;
            XRAnchor: false;
            XRAnchorSet: false;
            XRBoundedReferenceSpace: false;
            XRCamera: false;
            XRCPUDepthInformation: false;
            XRDepthInformation: false;
            XRDOMOverlayState: false;
            XRFrame: false;
            XRHand: false;
            XRHitTestResult: false;
            XRHitTestSource: false;
            XRInputSource: false;
            XRInputSourceArray: false;
            XRInputSourceEvent: false;
            XRInputSourcesChangeEvent: false;
            XRJointPose: false;
            XRJointSpace: false;
            XRLayer: false;
            XRLightEstimate: false;
            XRLightProbe: false;
            XRPose: false;
            XRRay: false;
            XRReferenceSpace: false;
            XRReferenceSpaceEvent: false;
            XRRenderState: false;
            XRRigidTransform: false;
            XRSession: false;
            XRSessionEvent: false;
            XRSpace: false;
            XRSystem: false;
            XRTransientInputHitTestResult: false;
            XRTransientInputHitTestSource: false;
            XRView: false;
            XRViewerPose: false;
            XRViewport: false;
            XRWebGLBinding: false;
            XRWebGLDepthInformation: false;
            XRWebGLLayer: false;
            XSLTProcessor: false;
            __dirname: false;
            __filename: false;
            Buffer: false;
            clearImmediate: false;
            exports: true;
            global: false;
            module: false;
            process: false;
            require: false;
            setImmediate: false;
        };
    };
    rules: {
        'no-console': string;
        'no-debugger': string;
        'no-alert': string;
        'perfectionist/sort-imports': (string | {
            internalPattern: string[];
        })[];
    };
} | {
    ignores: string[];
})[];

export declare const default_alias_4: ({
    languageOptions: {
        globals: {
            AbortController: false;
            AbortSignal: false;
            AbsoluteOrientationSensor: false;
            AbstractRange: false;
            Accelerometer: false;
            addEventListener: false;
            ai: false;
            AI: false;
            AITextSession: false;
            alert: false;
            AnalyserNode: false;
            Animation: false;
            AnimationEffect: false;
            AnimationEvent: false;
            AnimationPlaybackEvent: false;
            AnimationTimeline: false;
            atob: false;
            Attr: false;
            Audio: false;
            AudioBuffer: false;
            AudioBufferSourceNode: false;
            AudioContext: false;
            AudioData: false;
            AudioDecoder: false;
            AudioDestinationNode: false;
            AudioEncoder: false;
            AudioListener: false;
            AudioNode: false;
            AudioParam: false;
            AudioParamMap: false;
            AudioProcessingEvent: false;
            AudioScheduledSourceNode: false;
            AudioSinkInfo: false;
            AudioWorklet: false;
            AudioWorkletGlobalScope: false;
            AudioWorkletNode: false;
            AudioWorkletProcessor: false;
            AuthenticatorAssertionResponse: false;
            AuthenticatorAttestationResponse: false;
            AuthenticatorResponse: false;
            BackgroundFetchManager: false;
            BackgroundFetchRecord: false;
            BackgroundFetchRegistration: false;
            BarcodeDetector: false;
            BarProp: false;
            BaseAudioContext: false;
            BatteryManager: false;
            BeforeUnloadEvent: false;
            BiquadFilterNode: false;
            Blob: false;
            BlobEvent: false;
            Bluetooth: false;
            BluetoothCharacteristicProperties: false;
            BluetoothDevice: false;
            BluetoothRemoteGATTCharacteristic: false;
            BluetoothRemoteGATTDescriptor: false;
            BluetoothRemoteGATTServer: false;
            BluetoothRemoteGATTService: false;
            BluetoothUUID: false;
            blur: false;
            BroadcastChannel: false;
            BrowserCaptureMediaStreamTrack: false;
            btoa: false;
            ByteLengthQueuingStrategy: false;
            Cache: false;
            caches: false;
            CacheStorage: false;
            cancelAnimationFrame: false;
            cancelIdleCallback: false;
            CanvasCaptureMediaStream: false;
            CanvasCaptureMediaStreamTrack: false;
            CanvasGradient: false;
            CanvasPattern: false;
            CanvasRenderingContext2D: false;
            CaptureController: false;
            CaretPosition: false;
            CDATASection: false;
            ChannelMergerNode: false;
            ChannelSplitterNode: false;
            ChapterInformation: false;
            CharacterBoundsUpdateEvent: false;
            CharacterData: false;
            clearInterval: false;
            clearTimeout: false;
            clientInformation: false;
            Clipboard: false;
            ClipboardEvent: false;
            ClipboardItem: false;
            close: false;
            closed: false;
            CloseEvent: false;
            CloseWatcher: false;
            Comment: false;
            CompositionEvent: false;
            CompressionStream: false;
            confirm: false;
            console: false;
            ConstantSourceNode: false;
            ContentVisibilityAutoStateChangeEvent: false;
            ConvolverNode: false;
            CookieChangeEvent: false;
            CookieDeprecationLabel: false;
            cookieStore: false;
            CookieStore: false;
            CookieStoreManager: false;
            CountQueuingStrategy: false;
            createImageBitmap: false;
            Credential: false;
            credentialless: false;
            CredentialsContainer: false;
            CropTarget: false;
            crossOriginIsolated: false;
            crypto: false;
            Crypto: false;
            CryptoKey: false;
            CSS: false;
            CSSAnimation: false;
            CSSConditionRule: false;
            CSSContainerRule: false;
            CSSCounterStyleRule: false;
            CSSFontFaceRule: false;
            CSSFontFeatureValuesRule: false;
            CSSFontPaletteValuesRule: false;
            CSSGroupingRule: false;
            CSSImageValue: false;
            CSSImportRule: false;
            CSSKeyframeRule: false;
            CSSKeyframesRule: false;
            CSSKeywordValue: false;
            CSSLayerBlockRule: false;
            CSSLayerStatementRule: false;
            CSSMarginRule: false;
            CSSMathClamp: false;
            CSSMathInvert: false;
            CSSMathMax: false;
            CSSMathMin: false;
            CSSMathNegate: false;
            CSSMathProduct: false;
            CSSMathSum: false;
            CSSMathValue: false;
            CSSMatrixComponent: false;
            CSSMediaRule: false;
            CSSNamespaceRule: false;
            CSSNestedDeclarations: false;
            CSSNumericArray: false;
            CSSNumericValue: false;
            CSSPageDescriptors: false;
            CSSPageRule: false;
            CSSPerspective: false;
            CSSPositionTryDescriptors: false;
            CSSPositionTryRule: false;
            CSSPositionValue: false;
            CSSPropertyRule: false;
            CSSRotate: false;
            CSSRule: false;
            CSSRuleList: false;
            CSSScale: false;
            CSSScopeRule: false;
            CSSSkew: false;
            CSSSkewX: false;
            CSSSkewY: false;
            CSSStartingStyleRule: false;
            CSSStyleDeclaration: false;
            CSSStyleRule: false;
            CSSStyleSheet: false;
            CSSStyleValue: false;
            CSSSupportsRule: false;
            CSSTransformComponent: false;
            CSSTransformValue: false;
            CSSTransition: false;
            CSSTranslate: false;
            CSSUnitValue: false;
            CSSUnparsedValue: false;
            CSSVariableReferenceValue: false;
            CSSViewTransitionRule: false;
            currentFrame: false;
            currentTime: false;
            CustomElementRegistry: false;
            customElements: false;
            CustomEvent: false;
            CustomStateSet: false;
            DataTransfer: false;
            DataTransferItem: false;
            DataTransferItemList: false;
            DecompressionStream: false;
            DelayNode: false;
            DelegatedInkTrailPresenter: false;
            DeviceMotionEvent: false;
            DeviceMotionEventAcceleration: false;
            DeviceMotionEventRotationRate: false;
            DeviceOrientationEvent: false;
            devicePixelRatio: false;
            dispatchEvent: false;
            document: false;
            Document: false;
            DocumentFragment: false;
            documentPictureInPicture: false;
            DocumentPictureInPicture: false;
            DocumentPictureInPictureEvent: false;
            DocumentTimeline: false;
            DocumentType: false;
            DOMError: false;
            DOMException: false;
            DOMImplementation: false;
            DOMMatrix: false;
            DOMMatrixReadOnly: false;
            DOMParser: false;
            DOMPoint: false;
            DOMPointReadOnly: false;
            DOMQuad: false;
            DOMRect: false;
            DOMRectList: false;
            DOMRectReadOnly: false;
            DOMStringList: false;
            DOMStringMap: false;
            DOMTokenList: false;
            DragEvent: false;
            DynamicsCompressorNode: false;
            EditContext: false;
            Element: false;
            ElementInternals: false;
            EncodedAudioChunk: false;
            EncodedVideoChunk: false;
            ErrorEvent: false;
            event: false;
            Event: false;
            EventCounts: false;
            EventSource: false;
            EventTarget: false;
            external: false;
            External: false;
            EyeDropper: false;
            FeaturePolicy: false;
            FederatedCredential: false;
            fence: false;
            Fence: false;
            FencedFrameConfig: false;
            fetch: false;
            fetchLater: false;
            FetchLaterResult: false;
            File: false;
            FileList: false;
            FileReader: false;
            FileSystem: false;
            FileSystemDirectoryEntry: false;
            FileSystemDirectoryHandle: false;
            FileSystemDirectoryReader: false;
            FileSystemEntry: false;
            FileSystemFileEntry: false;
            FileSystemFileHandle: false;
            FileSystemHandle: false;
            FileSystemWritableFileStream: false;
            find: false;
            Float16Array: false;
            focus: false;
            FocusEvent: false;
            FontData: false;
            FontFace: false;
            FontFaceSet: false;
            FontFaceSetLoadEvent: false;
            FormData: false;
            FormDataEvent: false;
            FragmentDirective: false;
            frameElement: false;
            frames: false;
            GainNode: false;
            Gamepad: false;
            GamepadAxisMoveEvent: false;
            GamepadButton: false;
            GamepadButtonEvent: false;
            GamepadEvent: false;
            GamepadHapticActuator: false;
            GamepadPose: false;
            Geolocation: false;
            GeolocationCoordinates: false;
            GeolocationPosition: false;
            GeolocationPositionError: false;
            getComputedStyle: false;
            getScreenDetails: false;
            getSelection: false;
            GPU: false;
            GPUAdapter: false;
            GPUAdapterInfo: false;
            GPUBindGroup: false;
            GPUBindGroupLayout: false;
            GPUBuffer: false;
            GPUBufferUsage: false;
            GPUCanvasContext: false;
            GPUColorWrite: false;
            GPUCommandBuffer: false;
            GPUCommandEncoder: false;
            GPUCompilationInfo: false;
            GPUCompilationMessage: false;
            GPUComputePassEncoder: false;
            GPUComputePipeline: false;
            GPUDevice: false;
            GPUDeviceLostInfo: false;
            GPUError: false;
            GPUExternalTexture: false;
            GPUInternalError: false;
            GPUMapMode: false;
            GPUOutOfMemoryError: false;
            GPUPipelineError: false;
            GPUPipelineLayout: false;
            GPUQuerySet: false;
            GPUQueue: false;
            GPURenderBundle: false;
            GPURenderBundleEncoder: false;
            GPURenderPassEncoder: false;
            GPURenderPipeline: false;
            GPUSampler: false;
            GPUShaderModule: false;
            GPUShaderStage: false;
            GPUSupportedFeatures: false;
            GPUSupportedLimits: false;
            GPUTexture: false;
            GPUTextureUsage: false;
            GPUTextureView: false;
            GPUUncapturedErrorEvent: false;
            GPUValidationError: false;
            GravitySensor: false;
            Gyroscope: false;
            HashChangeEvent: false;
            Headers: false;
            HID: false;
            HIDConnectionEvent: false;
            HIDDevice: false;
            HIDInputReportEvent: false;
            Highlight: false;
            HighlightRegistry: false;
            history: false;
            History: false;
            HTMLAllCollection: false;
            HTMLAnchorElement: false;
            HTMLAreaElement: false;
            HTMLAudioElement: false;
            HTMLBaseElement: false;
            HTMLBodyElement: false;
            HTMLBRElement: false;
            HTMLButtonElement: false;
            HTMLCanvasElement: false;
            HTMLCollection: false;
            HTMLDataElement: false;
            HTMLDataListElement: false;
            HTMLDetailsElement: false;
            HTMLDialogElement: false;
            HTMLDirectoryElement: false;
            HTMLDivElement: false;
            HTMLDListElement: false;
            HTMLDocument: false;
            HTMLElement: false;
            HTMLEmbedElement: false;
            HTMLFencedFrameElement: false;
            HTMLFieldSetElement: false;
            HTMLFontElement: false;
            HTMLFormControlsCollection: false;
            HTMLFormElement: false;
            HTMLFrameElement: false;
            HTMLFrameSetElement: false;
            HTMLHeadElement: false;
            HTMLHeadingElement: false;
            HTMLHRElement: false;
            HTMLHtmlElement: false;
            HTMLIFrameElement: false;
            HTMLImageElement: false;
            HTMLInputElement: false;
            HTMLLabelElement: false;
            HTMLLegendElement: false;
            HTMLLIElement: false;
            HTMLLinkElement: false;
            HTMLMapElement: false;
            HTMLMarqueeElement: false;
            HTMLMediaElement: false;
            HTMLMenuElement: false;
            HTMLMetaElement: false;
            HTMLMeterElement: false;
            HTMLModElement: false;
            HTMLObjectElement: false;
            HTMLOListElement: false;
            HTMLOptGroupElement: false;
            HTMLOptionElement: false;
            HTMLOptionsCollection: false;
            HTMLOutputElement: false;
            HTMLParagraphElement: false;
            HTMLParamElement: false;
            HTMLPictureElement: false;
            HTMLPreElement: false;
            HTMLProgressElement: false;
            HTMLQuoteElement: false;
            HTMLScriptElement: false;
            HTMLSelectElement: false;
            HTMLSlotElement: false;
            HTMLSourceElement: false;
            HTMLSpanElement: false;
            HTMLStyleElement: false;
            HTMLTableCaptionElement: false;
            HTMLTableCellElement: false;
            HTMLTableColElement: false;
            HTMLTableElement: false;
            HTMLTableRowElement: false;
            HTMLTableSectionElement: false;
            HTMLTemplateElement: false;
            HTMLTextAreaElement: false;
            HTMLTimeElement: false;
            HTMLTitleElement: false;
            HTMLTrackElement: false;
            HTMLUListElement: false;
            HTMLUnknownElement: false;
            HTMLVideoElement: false;
            IDBCursor: false;
            IDBCursorWithValue: false;
            IDBDatabase: false;
            IDBFactory: false;
            IDBIndex: false;
            IDBKeyRange: false;
            IDBObjectStore: false;
            IDBOpenDBRequest: false;
            IDBRequest: false;
            IDBTransaction: false;
            IDBVersionChangeEvent: false;
            IdentityCredential: false;
            IdentityCredentialError: false;
            IdentityProvider: false;
            IdleDeadline: false;
            IdleDetector: false;
            IIRFilterNode: false;
            Image: false;
            ImageBitmap: false;
            ImageBitmapRenderingContext: false;
            ImageCapture: false;
            ImageData: false;
            ImageDecoder: false;
            ImageTrack: false;
            ImageTrackList: false;
            indexedDB: false;
            Ink: false;
            innerHeight: false;
            innerWidth: false;
            InputDeviceCapabilities: false;
            InputDeviceInfo: false;
            InputEvent: false;
            IntersectionObserver: false;
            IntersectionObserverEntry: false;
            isSecureContext: false;
            Keyboard: false;
            KeyboardEvent: false;
            KeyboardLayoutMap: false;
            KeyframeEffect: false;
            LargestContentfulPaint: false;
            LaunchParams: false;
            launchQueue: false;
            LaunchQueue: false;
            LayoutShift: false;
            LayoutShiftAttribution: false;
            length: false;
            LinearAccelerationSensor: false;
            localStorage: false;
            location: true;
            Location: false;
            locationbar: false;
            Lock: false;
            LockManager: false;
            matchMedia: false;
            MathMLElement: false;
            MediaCapabilities: false;
            MediaCapabilitiesInfo: false;
            MediaDeviceInfo: false;
            MediaDevices: false;
            MediaElementAudioSourceNode: false;
            MediaEncryptedEvent: false;
            MediaError: false;
            MediaKeyError: false;
            MediaKeyMessageEvent: false;
            MediaKeys: false;
            MediaKeySession: false;
            MediaKeyStatusMap: false;
            MediaKeySystemAccess: false;
            MediaList: false;
            MediaMetadata: false;
            MediaQueryList: false;
            MediaQueryListEvent: false;
            MediaRecorder: false;
            MediaRecorderErrorEvent: false;
            MediaSession: false;
            MediaSource: false;
            MediaSourceHandle: false;
            MediaStream: false;
            MediaStreamAudioDestinationNode: false;
            MediaStreamAudioSourceNode: false;
            MediaStreamEvent: false;
            MediaStreamTrack: false;
            MediaStreamTrackAudioSourceNode: false;
            MediaStreamTrackAudioStats: false;
            MediaStreamTrackEvent: false;
            MediaStreamTrackGenerator: false;
            MediaStreamTrackProcessor: false;
            MediaStreamTrackVideoStats: false;
            menubar: false;
            MessageChannel: false;
            MessageEvent: false;
            MessagePort: false;
            MIDIAccess: false;
            MIDIConnectionEvent: false;
            MIDIInput: false;
            MIDIInputMap: false;
            MIDIMessageEvent: false;
            MIDIOutput: false;
            MIDIOutputMap: false;
            MIDIPort: false;
            MimeType: false;
            MimeTypeArray: false;
            model: false;
            ModelGenericSession: false;
            ModelManager: false;
            MouseEvent: false;
            moveBy: false;
            moveTo: false;
            MutationEvent: false;
            MutationObserver: false;
            MutationRecord: false;
            name: false;
            NamedNodeMap: false;
            NavigateEvent: false;
            navigation: false;
            Navigation: false;
            NavigationActivation: false;
            NavigationCurrentEntryChangeEvent: false;
            NavigationDestination: false;
            NavigationHistoryEntry: false;
            NavigationPreloadManager: false;
            NavigationTransition: false;
            navigator: false;
            Navigator: false;
            NavigatorLogin: false;
            NavigatorManagedData: false;
            NavigatorUAData: false;
            NetworkInformation: false;
            Node: false;
            NodeFilter: false;
            NodeIterator: false;
            NodeList: false;
            Notification: false;
            NotifyPaintEvent: false;
            NotRestoredReasonDetails: false;
            NotRestoredReasons: false;
            OfflineAudioCompletionEvent: false;
            OfflineAudioContext: false;
            offscreenBuffering: false;
            OffscreenCanvas: false;
            OffscreenCanvasRenderingContext2D: false;
            onabort: true;
            onafterprint: true;
            onanimationcancel: true;
            onanimationend: true;
            onanimationiteration: true;
            onanimationstart: true;
            onappinstalled: true;
            onauxclick: true;
            onbeforeinput: true;
            onbeforeinstallprompt: true;
            onbeforematch: true;
            onbeforeprint: true;
            onbeforetoggle: true;
            onbeforeunload: true;
            onbeforexrselect: true;
            onblur: true;
            oncancel: true;
            oncanplay: true;
            oncanplaythrough: true;
            onchange: true;
            onclick: true;
            onclose: true;
            oncontentvisibilityautostatechange: true;
            oncontextlost: true;
            oncontextmenu: true;
            oncontextrestored: true;
            oncopy: true;
            oncuechange: true;
            oncut: true;
            ondblclick: true;
            ondevicemotion: true;
            ondeviceorientation: true;
            ondeviceorientationabsolute: true;
            ondrag: true;
            ondragend: true;
            ondragenter: true;
            ondragleave: true;
            ondragover: true;
            ondragstart: true;
            ondrop: true;
            ondurationchange: true;
            onemptied: true;
            onended: true;
            onerror: true;
            onfocus: true;
            onformdata: true;
            ongamepadconnected: true;
            ongamepaddisconnected: true;
            ongotpointercapture: true;
            onhashchange: true;
            oninput: true;
            oninvalid: true;
            onkeydown: true;
            onkeypress: true;
            onkeyup: true;
            onlanguagechange: true;
            onload: true;
            onloadeddata: true;
            onloadedmetadata: true;
            onloadstart: true;
            onlostpointercapture: true;
            onmessage: true;
            onmessageerror: true;
            onmousedown: true;
            onmouseenter: true;
            onmouseleave: true;
            onmousemove: true;
            onmouseout: true;
            onmouseover: true;
            onmouseup: true;
            onmousewheel: true;
            onoffline: true;
            ononline: true;
            onpagehide: true;
            onpagereveal: true;
            onpageshow: true;
            onpageswap: true;
            onpaste: true;
            onpause: true;
            onplay: true;
            onplaying: true;
            onpointercancel: true;
            onpointerdown: true;
            onpointerenter: true;
            onpointerleave: true;
            onpointermove: true;
            onpointerout: true;
            onpointerover: true;
            onpointerrawupdate: true;
            onpointerup: true;
            onpopstate: true;
            onprogress: true;
            onratechange: true;
            onrejectionhandled: true;
            onreset: true;
            onresize: true;
            onscroll: true;
            onscrollend: true;
            onscrollsnapchange: true;
            onscrollsnapchanging: true;
            onsearch: true;
            onsecuritypolicyviolation: true;
            onseeked: true;
            onseeking: true;
            onselect: true;
            onselectionchange: true;
            onselectstart: true;
            onslotchange: true;
            onstalled: true;
            onstorage: true;
            onsubmit: true;
            onsuspend: true;
            ontimeupdate: true;
            ontoggle: true;
            ontransitioncancel: true;
            ontransitionend: true;
            ontransitionrun: true;
            ontransitionstart: true;
            onunhandledrejection: true;
            onunload: true;
            onvolumechange: true;
            onwaiting: true;
            onwheel: true;
            open: false;
            opener: false;
            Option: false;
            OrientationSensor: false;
            origin: false;
            originAgentCluster: false;
            OscillatorNode: false;
            OTPCredential: false;
            outerHeight: false;
            outerWidth: false;
            OverconstrainedError: false;
            PageRevealEvent: false;
            PageSwapEvent: false;
            PageTransitionEvent: false;
            pageXOffset: false;
            pageYOffset: false;
            PannerNode: false;
            parent: false;
            PasswordCredential: false;
            Path2D: false;
            PaymentAddress: false;
            PaymentManager: false;
            PaymentMethodChangeEvent: false;
            PaymentRequest: false;
            PaymentRequestUpdateEvent: false;
            PaymentResponse: false;
            performance: false;
            Performance: false;
            PerformanceElementTiming: false;
            PerformanceEntry: false;
            PerformanceEventTiming: false;
            PerformanceLongAnimationFrameTiming: false;
            PerformanceLongTaskTiming: false;
            PerformanceMark: false;
            PerformanceMeasure: false;
            PerformanceNavigation: false;
            PerformanceNavigationTiming: false;
            PerformanceObserver: false;
            PerformanceObserverEntryList: false;
            PerformancePaintTiming: false;
            PerformanceResourceTiming: false;
            PerformanceScriptTiming: false;
            PerformanceServerTiming: false;
            PerformanceTiming: false;
            PeriodicSyncManager: false;
            PeriodicWave: false;
            Permissions: false;
            PermissionStatus: false;
            PERSISTENT: false;
            personalbar: false;
            PictureInPictureEvent: false;
            PictureInPictureWindow: false;
            Plugin: false;
            PluginArray: false;
            PointerEvent: false;
            PopStateEvent: false;
            postMessage: false;
            Presentation: false;
            PresentationAvailability: false;
            PresentationConnection: false;
            PresentationConnectionAvailableEvent: false;
            PresentationConnectionCloseEvent: false;
            PresentationConnectionList: false;
            PresentationReceiver: false;
            PresentationRequest: false;
            PressureObserver: false;
            PressureRecord: false;
            print: false;
            ProcessingInstruction: false;
            Profiler: false;
            ProgressEvent: false;
            PromiseRejectionEvent: false;
            prompt: false;
            ProtectedAudience: false;
            PublicKeyCredential: false;
            PushManager: false;
            PushSubscription: false;
            PushSubscriptionOptions: false;
            queryLocalFonts: false;
            queueMicrotask: false;
            RadioNodeList: false;
            Range: false;
            ReadableByteStreamController: false;
            ReadableStream: false;
            ReadableStreamBYOBReader: false;
            ReadableStreamBYOBRequest: false;
            ReadableStreamDefaultController: false;
            ReadableStreamDefaultReader: false;
            registerProcessor: false;
            RelativeOrientationSensor: false;
            RemotePlayback: false;
            removeEventListener: false;
            reportError: false;
            ReportingObserver: false;
            Request: false;
            requestAnimationFrame: false;
            requestIdleCallback: false;
            resizeBy: false;
            ResizeObserver: false;
            ResizeObserverEntry: false;
            ResizeObserverSize: false;
            resizeTo: false;
            Response: false;
            RTCCertificate: false;
            RTCDataChannel: false;
            RTCDataChannelEvent: false;
            RTCDtlsTransport: false;
            RTCDTMFSender: false;
            RTCDTMFToneChangeEvent: false;
            RTCEncodedAudioFrame: false;
            RTCEncodedVideoFrame: false;
            RTCError: false;
            RTCErrorEvent: false;
            RTCIceCandidate: false;
            RTCIceTransport: false;
            RTCPeerConnection: false;
            RTCPeerConnectionIceErrorEvent: false;
            RTCPeerConnectionIceEvent: false;
            RTCRtpReceiver: false;
            RTCRtpScriptTransform: false;
            RTCRtpSender: false;
            RTCRtpTransceiver: false;
            RTCSctpTransport: false;
            RTCSessionDescription: false;
            RTCStatsReport: false;
            RTCTrackEvent: false;
            sampleRate: false;
            scheduler: false;
            Scheduler: false;
            Scheduling: false;
            screen: false;
            Screen: false;
            ScreenDetailed: false;
            ScreenDetails: false;
            screenLeft: false;
            ScreenOrientation: false;
            screenTop: false;
            screenX: false;
            screenY: false;
            ScriptProcessorNode: false;
            scroll: false;
            scrollbars: false;
            scrollBy: false;
            ScrollTimeline: false;
            scrollTo: false;
            scrollX: false;
            scrollY: false;
            SecurityPolicyViolationEvent: false;
            Selection: false;
            self: false;
            Sensor: false;
            SensorErrorEvent: false;
            Serial: false;
            SerialPort: false;
            ServiceWorker: false;
            ServiceWorkerContainer: false;
            ServiceWorkerRegistration: false;
            sessionStorage: false;
            setInterval: false;
            setTimeout: false;
            ShadowRoot: false;
            sharedStorage: false;
            SharedStorage: false;
            SharedStorageWorklet: false;
            SharedWorker: false;
            showDirectoryPicker: false;
            showOpenFilePicker: false;
            showSaveFilePicker: false;
            SnapEvent: false;
            SourceBuffer: false;
            SourceBufferList: false;
            speechSynthesis: false;
            SpeechSynthesis: false;
            SpeechSynthesisErrorEvent: false;
            SpeechSynthesisEvent: false;
            SpeechSynthesisUtterance: false;
            SpeechSynthesisVoice: false;
            StaticRange: false;
            status: false;
            statusbar: false;
            StereoPannerNode: false;
            stop: false;
            Storage: false;
            StorageBucket: false;
            StorageBucketManager: false;
            StorageEvent: false;
            StorageManager: false;
            structuredClone: false;
            styleMedia: false;
            StylePropertyMap: false;
            StylePropertyMapReadOnly: false;
            StyleSheet: false;
            StyleSheetList: false;
            SubmitEvent: false;
            SubtleCrypto: false;
            SVGAElement: false;
            SVGAngle: false;
            SVGAnimatedAngle: false;
            SVGAnimatedBoolean: false;
            SVGAnimatedEnumeration: false;
            SVGAnimatedInteger: false;
            SVGAnimatedLength: false;
            SVGAnimatedLengthList: false;
            SVGAnimatedNumber: false;
            SVGAnimatedNumberList: false;
            SVGAnimatedPreserveAspectRatio: false;
            SVGAnimatedRect: false;
            SVGAnimatedString: false;
            SVGAnimatedTransformList: false;
            SVGAnimateElement: false;
            SVGAnimateMotionElement: false;
            SVGAnimateTransformElement: false;
            SVGAnimationElement: false;
            SVGCircleElement: false;
            SVGClipPathElement: false;
            SVGComponentTransferFunctionElement: false;
            SVGDefsElement: false;
            SVGDescElement: false;
            SVGElement: false;
            SVGEllipseElement: false;
            SVGFEBlendElement: false;
            SVGFEColorMatrixElement: false;
            SVGFEComponentTransferElement: false;
            SVGFECompositeElement: false;
            SVGFEConvolveMatrixElement: false;
            SVGFEDiffuseLightingElement: false;
            SVGFEDisplacementMapElement: false;
            SVGFEDistantLightElement: false;
            SVGFEDropShadowElement: false;
            SVGFEFloodElement: false;
            SVGFEFuncAElement: false;
            SVGFEFuncBElement: false;
            SVGFEFuncGElement: false;
            SVGFEFuncRElement: false;
            SVGFEGaussianBlurElement: false;
            SVGFEImageElement: false;
            SVGFEMergeElement: false;
            SVGFEMergeNodeElement: false;
            SVGFEMorphologyElement: false;
            SVGFEOffsetElement: false;
            SVGFEPointLightElement: false;
            SVGFESpecularLightingElement: false;
            SVGFESpotLightElement: false;
            SVGFETileElement: false;
            SVGFETurbulenceElement: false;
            SVGFilterElement: false;
            SVGForeignObjectElement: false;
            SVGGElement: false;
            SVGGeometryElement: false;
            SVGGradientElement: false;
            SVGGraphicsElement: false;
            SVGImageElement: false;
            SVGLength: false;
            SVGLengthList: false;
            SVGLinearGradientElement: false;
            SVGLineElement: false;
            SVGMarkerElement: false;
            SVGMaskElement: false;
            SVGMatrix: false;
            SVGMetadataElement: false;
            SVGMPathElement: false;
            SVGNumber: false;
            SVGNumberList: false;
            SVGPathElement: false;
            SVGPatternElement: false;
            SVGPoint: false;
            SVGPointList: false;
            SVGPolygonElement: false;
            SVGPolylineElement: false;
            SVGPreserveAspectRatio: false;
            SVGRadialGradientElement: false;
            SVGRect: false;
            SVGRectElement: false;
            SVGScriptElement: false;
            SVGSetElement: false;
            SVGStopElement: false;
            SVGStringList: false;
            SVGStyleElement: false;
            SVGSVGElement: false;
            SVGSwitchElement: false;
            SVGSymbolElement: false;
            SVGTextContentElement: false;
            SVGTextElement: false;
            SVGTextPathElement: false;
            SVGTextPositioningElement: false;
            SVGTitleElement: false;
            SVGTransform: false;
            SVGTransformList: false;
            SVGTSpanElement: false;
            SVGUnitTypes: false;
            SVGUseElement: false;
            SVGViewElement: false;
            SyncManager: false;
            TaskAttributionTiming: false;
            TaskController: false;
            TaskPriorityChangeEvent: false;
            TaskSignal: false;
            TEMPORARY: false;
            Text: false;
            TextDecoder: false;
            TextDecoderStream: false;
            TextEncoder: false;
            TextEncoderStream: false;
            TextEvent: false;
            TextFormat: false;
            TextFormatUpdateEvent: false;
            TextMetrics: false;
            TextTrack: false;
            TextTrackCue: false;
            TextTrackCueList: false;
            TextTrackList: false;
            TextUpdateEvent: false;
            TimeEvent: false;
            TimeRanges: false;
            ToggleEvent: false;
            toolbar: false;
            top: false;
            Touch: false;
            TouchEvent: false;
            TouchList: false;
            TrackEvent: false;
            TransformStream: false;
            TransformStreamDefaultController: false;
            TransitionEvent: false;
            TreeWalker: false;
            TrustedHTML: false;
            TrustedScript: false;
            TrustedScriptURL: false;
            TrustedTypePolicy: false;
            TrustedTypePolicyFactory: false;
            trustedTypes: false;
            UIEvent: false;
            URL: false;
            URLPattern: false;
            URLSearchParams: false;
            USB: false;
            USBAlternateInterface: false;
            USBConfiguration: false;
            USBConnectionEvent: false;
            USBDevice: false;
            USBEndpoint: false;
            USBInterface: false;
            USBInTransferResult: false;
            USBIsochronousInTransferPacket: false;
            USBIsochronousInTransferResult: false;
            USBIsochronousOutTransferPacket: false;
            USBIsochronousOutTransferResult: false;
            USBOutTransferResult: false;
            UserActivation: false;
            ValidityState: false;
            VideoColorSpace: false;
            VideoDecoder: false;
            VideoEncoder: false;
            VideoFrame: false;
            VideoPlaybackQuality: false;
            ViewTimeline: false;
            ViewTransition: false;
            ViewTransitionTypeSet: false;
            VirtualKeyboard: false;
            VirtualKeyboardGeometryChangeEvent: false;
            VisibilityStateEntry: false;
            visualViewport: false;
            VisualViewport: false;
            VTTCue: false;
            VTTRegion: false;
            WakeLock: false;
            WakeLockSentinel: false;
            WaveShaperNode: false;
            WebAssembly: false;
            WebGL2RenderingContext: false;
            WebGLActiveInfo: false;
            WebGLBuffer: false;
            WebGLContextEvent: false;
            WebGLFramebuffer: false;
            WebGLObject: false;
            WebGLProgram: false;
            WebGLQuery: false;
            WebGLRenderbuffer: false;
            WebGLRenderingContext: false;
            WebGLSampler: false;
            WebGLShader: false;
            WebGLShaderPrecisionFormat: false;
            WebGLSync: false;
            WebGLTexture: false;
            WebGLTransformFeedback: false;
            WebGLUniformLocation: false;
            WebGLVertexArrayObject: false;
            WebSocket: false;
            WebSocketError: false;
            WebSocketStream: false;
            WebTransport: false;
            WebTransportBidirectionalStream: false;
            WebTransportDatagramDuplexStream: false;
            WebTransportError: false;
            WebTransportReceiveStream: false;
            WebTransportSendStream: false;
            WGSLLanguageFeatures: false;
            WheelEvent: false;
            window: false;
            Window: false;
            WindowControlsOverlay: false;
            WindowControlsOverlayGeometryChangeEvent: false;
            Worker: false;
            Worklet: false;
            WorkletGlobalScope: false;
            WritableStream: false;
            WritableStreamDefaultController: false;
            WritableStreamDefaultWriter: false;
            XMLDocument: false;
            XMLHttpRequest: false;
            XMLHttpRequestEventTarget: false;
            XMLHttpRequestUpload: false;
            XMLSerializer: false;
            XPathEvaluator: false;
            XPathExpression: false;
            XPathResult: false;
            XRAnchor: false;
            XRAnchorSet: false;
            XRBoundedReferenceSpace: false;
            XRCamera: false;
            XRCPUDepthInformation: false;
            XRDepthInformation: false;
            XRDOMOverlayState: false;
            XRFrame: false;
            XRHand: false;
            XRHitTestResult: false;
            XRHitTestSource: false;
            XRInputSource: false;
            XRInputSourceArray: false;
            XRInputSourceEvent: false;
            XRInputSourcesChangeEvent: false;
            XRJointPose: false;
            XRJointSpace: false;
            XRLayer: false;
            XRLightEstimate: false;
            XRLightProbe: false;
            XRPose: false;
            XRRay: false;
            XRReferenceSpace: false;
            XRReferenceSpaceEvent: false;
            XRRenderState: false;
            XRRigidTransform: false;
            XRSession: false;
            XRSessionEvent: false;
            XRSpace: false;
            XRSystem: false;
            XRTransientInputHitTestResult: false;
            XRTransientInputHitTestSource: false;
            XRView: false;
            XRViewerPose: false;
            XRViewport: false;
            XRWebGLBinding: false;
            XRWebGLDepthInformation: false;
            XRWebGLLayer: false;
            XSLTProcessor: false;
            __dirname: false;
            __filename: false;
            Buffer: false;
            clearImmediate: false;
            exports: true;
            global: false;
            module: false;
            process: false;
            require: false;
            setImmediate: false;
        };
    };
    rules: {
        'no-console': string;
        'no-debugger': string;
        'no-alert': string;
        'perfectionist/sort-imports': (string | {
            internalPattern: string[];
        })[];
    };
} | {
    ignores: string[];
})[];

export declare const default_alias_5: ({
    languageOptions: {
        globals: {
            AbortController: false;
            AbortSignal: false;
            AbsoluteOrientationSensor: false;
            AbstractRange: false;
            Accelerometer: false;
            addEventListener: false;
            ai: false;
            AI: false;
            AITextSession: false;
            alert: false;
            AnalyserNode: false;
            Animation: false;
            AnimationEffect: false;
            AnimationEvent: false;
            AnimationPlaybackEvent: false;
            AnimationTimeline: false;
            atob: false;
            Attr: false;
            Audio: false;
            AudioBuffer: false;
            AudioBufferSourceNode: false;
            AudioContext: false;
            AudioData: false;
            AudioDecoder: false;
            AudioDestinationNode: false;
            AudioEncoder: false;
            AudioListener: false;
            AudioNode: false;
            AudioParam: false;
            AudioParamMap: false;
            AudioProcessingEvent: false;
            AudioScheduledSourceNode: false;
            AudioSinkInfo: false;
            AudioWorklet: false;
            AudioWorkletGlobalScope: false;
            AudioWorkletNode: false;
            AudioWorkletProcessor: false;
            AuthenticatorAssertionResponse: false;
            AuthenticatorAttestationResponse: false;
            AuthenticatorResponse: false;
            BackgroundFetchManager: false;
            BackgroundFetchRecord: false;
            BackgroundFetchRegistration: false;
            BarcodeDetector: false;
            BarProp: false;
            BaseAudioContext: false;
            BatteryManager: false;
            BeforeUnloadEvent: false;
            BiquadFilterNode: false;
            Blob: false;
            BlobEvent: false;
            Bluetooth: false;
            BluetoothCharacteristicProperties: false;
            BluetoothDevice: false;
            BluetoothRemoteGATTCharacteristic: false;
            BluetoothRemoteGATTDescriptor: false;
            BluetoothRemoteGATTServer: false;
            BluetoothRemoteGATTService: false;
            BluetoothUUID: false;
            blur: false;
            BroadcastChannel: false;
            BrowserCaptureMediaStreamTrack: false;
            btoa: false;
            ByteLengthQueuingStrategy: false;
            Cache: false;
            caches: false;
            CacheStorage: false;
            cancelAnimationFrame: false;
            cancelIdleCallback: false;
            CanvasCaptureMediaStream: false;
            CanvasCaptureMediaStreamTrack: false;
            CanvasGradient: false;
            CanvasPattern: false;
            CanvasRenderingContext2D: false;
            CaptureController: false;
            CaretPosition: false;
            CDATASection: false;
            ChannelMergerNode: false;
            ChannelSplitterNode: false;
            ChapterInformation: false;
            CharacterBoundsUpdateEvent: false;
            CharacterData: false;
            clearInterval: false;
            clearTimeout: false;
            clientInformation: false;
            Clipboard: false;
            ClipboardEvent: false;
            ClipboardItem: false;
            close: false;
            closed: false;
            CloseEvent: false;
            CloseWatcher: false;
            Comment: false;
            CompositionEvent: false;
            CompressionStream: false;
            confirm: false;
            console: false;
            ConstantSourceNode: false;
            ContentVisibilityAutoStateChangeEvent: false;
            ConvolverNode: false;
            CookieChangeEvent: false;
            CookieDeprecationLabel: false;
            cookieStore: false;
            CookieStore: false;
            CookieStoreManager: false;
            CountQueuingStrategy: false;
            createImageBitmap: false;
            Credential: false;
            credentialless: false;
            CredentialsContainer: false;
            CropTarget: false;
            crossOriginIsolated: false;
            crypto: false;
            Crypto: false;
            CryptoKey: false;
            CSS: false;
            CSSAnimation: false;
            CSSConditionRule: false;
            CSSContainerRule: false;
            CSSCounterStyleRule: false;
            CSSFontFaceRule: false;
            CSSFontFeatureValuesRule: false;
            CSSFontPaletteValuesRule: false;
            CSSGroupingRule: false;
            CSSImageValue: false;
            CSSImportRule: false;
            CSSKeyframeRule: false;
            CSSKeyframesRule: false;
            CSSKeywordValue: false;
            CSSLayerBlockRule: false;
            CSSLayerStatementRule: false;
            CSSMarginRule: false;
            CSSMathClamp: false;
            CSSMathInvert: false;
            CSSMathMax: false;
            CSSMathMin: false;
            CSSMathNegate: false;
            CSSMathProduct: false;
            CSSMathSum: false;
            CSSMathValue: false;
            CSSMatrixComponent: false;
            CSSMediaRule: false;
            CSSNamespaceRule: false;
            CSSNestedDeclarations: false;
            CSSNumericArray: false;
            CSSNumericValue: false;
            CSSPageDescriptors: false;
            CSSPageRule: false;
            CSSPerspective: false;
            CSSPositionTryDescriptors: false;
            CSSPositionTryRule: false;
            CSSPositionValue: false;
            CSSPropertyRule: false;
            CSSRotate: false;
            CSSRule: false;
            CSSRuleList: false;
            CSSScale: false;
            CSSScopeRule: false;
            CSSSkew: false;
            CSSSkewX: false;
            CSSSkewY: false;
            CSSStartingStyleRule: false;
            CSSStyleDeclaration: false;
            CSSStyleRule: false;
            CSSStyleSheet: false;
            CSSStyleValue: false;
            CSSSupportsRule: false;
            CSSTransformComponent: false;
            CSSTransformValue: false;
            CSSTransition: false;
            CSSTranslate: false;
            CSSUnitValue: false;
            CSSUnparsedValue: false;
            CSSVariableReferenceValue: false;
            CSSViewTransitionRule: false;
            currentFrame: false;
            currentTime: false;
            CustomElementRegistry: false;
            customElements: false;
            CustomEvent: false;
            CustomStateSet: false;
            DataTransfer: false;
            DataTransferItem: false;
            DataTransferItemList: false;
            DecompressionStream: false;
            DelayNode: false;
            DelegatedInkTrailPresenter: false;
            DeviceMotionEvent: false;
            DeviceMotionEventAcceleration: false;
            DeviceMotionEventRotationRate: false;
            DeviceOrientationEvent: false;
            devicePixelRatio: false;
            dispatchEvent: false;
            document: false;
            Document: false;
            DocumentFragment: false;
            documentPictureInPicture: false;
            DocumentPictureInPicture: false;
            DocumentPictureInPictureEvent: false;
            DocumentTimeline: false;
            DocumentType: false;
            DOMError: false;
            DOMException: false;
            DOMImplementation: false;
            DOMMatrix: false;
            DOMMatrixReadOnly: false;
            DOMParser: false;
            DOMPoint: false;
            DOMPointReadOnly: false;
            DOMQuad: false;
            DOMRect: false;
            DOMRectList: false;
            DOMRectReadOnly: false;
            DOMStringList: false;
            DOMStringMap: false;
            DOMTokenList: false;
            DragEvent: false;
            DynamicsCompressorNode: false;
            EditContext: false;
            Element: false;
            ElementInternals: false;
            EncodedAudioChunk: false;
            EncodedVideoChunk: false;
            ErrorEvent: false;
            event: false;
            Event: false;
            EventCounts: false;
            EventSource: false;
            EventTarget: false;
            external: false;
            External: false;
            EyeDropper: false;
            FeaturePolicy: false;
            FederatedCredential: false;
            fence: false;
            Fence: false;
            FencedFrameConfig: false;
            fetch: false;
            fetchLater: false;
            FetchLaterResult: false;
            File: false;
            FileList: false;
            FileReader: false;
            FileSystem: false;
            FileSystemDirectoryEntry: false;
            FileSystemDirectoryHandle: false;
            FileSystemDirectoryReader: false;
            FileSystemEntry: false;
            FileSystemFileEntry: false;
            FileSystemFileHandle: false;
            FileSystemHandle: false;
            FileSystemWritableFileStream: false;
            find: false;
            Float16Array: false;
            focus: false;
            FocusEvent: false;
            FontData: false;
            FontFace: false;
            FontFaceSet: false;
            FontFaceSetLoadEvent: false;
            FormData: false;
            FormDataEvent: false;
            FragmentDirective: false;
            frameElement: false;
            frames: false;
            GainNode: false;
            Gamepad: false;
            GamepadAxisMoveEvent: false;
            GamepadButton: false;
            GamepadButtonEvent: false;
            GamepadEvent: false;
            GamepadHapticActuator: false;
            GamepadPose: false;
            Geolocation: false;
            GeolocationCoordinates: false;
            GeolocationPosition: false;
            GeolocationPositionError: false;
            getComputedStyle: false;
            getScreenDetails: false;
            getSelection: false;
            GPU: false;
            GPUAdapter: false;
            GPUAdapterInfo: false;
            GPUBindGroup: false;
            GPUBindGroupLayout: false;
            GPUBuffer: false;
            GPUBufferUsage: false;
            GPUCanvasContext: false;
            GPUColorWrite: false;
            GPUCommandBuffer: false;
            GPUCommandEncoder: false;
            GPUCompilationInfo: false;
            GPUCompilationMessage: false;
            GPUComputePassEncoder: false;
            GPUComputePipeline: false;
            GPUDevice: false;
            GPUDeviceLostInfo: false;
            GPUError: false;
            GPUExternalTexture: false;
            GPUInternalError: false;
            GPUMapMode: false;
            GPUOutOfMemoryError: false;
            GPUPipelineError: false;
            GPUPipelineLayout: false;
            GPUQuerySet: false;
            GPUQueue: false;
            GPURenderBundle: false;
            GPURenderBundleEncoder: false;
            GPURenderPassEncoder: false;
            GPURenderPipeline: false;
            GPUSampler: false;
            GPUShaderModule: false;
            GPUShaderStage: false;
            GPUSupportedFeatures: false;
            GPUSupportedLimits: false;
            GPUTexture: false;
            GPUTextureUsage: false;
            GPUTextureView: false;
            GPUUncapturedErrorEvent: false;
            GPUValidationError: false;
            GravitySensor: false;
            Gyroscope: false;
            HashChangeEvent: false;
            Headers: false;
            HID: false;
            HIDConnectionEvent: false;
            HIDDevice: false;
            HIDInputReportEvent: false;
            Highlight: false;
            HighlightRegistry: false;
            history: false;
            History: false;
            HTMLAllCollection: false;
            HTMLAnchorElement: false;
            HTMLAreaElement: false;
            HTMLAudioElement: false;
            HTMLBaseElement: false;
            HTMLBodyElement: false;
            HTMLBRElement: false;
            HTMLButtonElement: false;
            HTMLCanvasElement: false;
            HTMLCollection: false;
            HTMLDataElement: false;
            HTMLDataListElement: false;
            HTMLDetailsElement: false;
            HTMLDialogElement: false;
            HTMLDirectoryElement: false;
            HTMLDivElement: false;
            HTMLDListElement: false;
            HTMLDocument: false;
            HTMLElement: false;
            HTMLEmbedElement: false;
            HTMLFencedFrameElement: false;
            HTMLFieldSetElement: false;
            HTMLFontElement: false;
            HTMLFormControlsCollection: false;
            HTMLFormElement: false;
            HTMLFrameElement: false;
            HTMLFrameSetElement: false;
            HTMLHeadElement: false;
            HTMLHeadingElement: false;
            HTMLHRElement: false;
            HTMLHtmlElement: false;
            HTMLIFrameElement: false;
            HTMLImageElement: false;
            HTMLInputElement: false;
            HTMLLabelElement: false;
            HTMLLegendElement: false;
            HTMLLIElement: false;
            HTMLLinkElement: false;
            HTMLMapElement: false;
            HTMLMarqueeElement: false;
            HTMLMediaElement: false;
            HTMLMenuElement: false;
            HTMLMetaElement: false;
            HTMLMeterElement: false;
            HTMLModElement: false;
            HTMLObjectElement: false;
            HTMLOListElement: false;
            HTMLOptGroupElement: false;
            HTMLOptionElement: false;
            HTMLOptionsCollection: false;
            HTMLOutputElement: false;
            HTMLParagraphElement: false;
            HTMLParamElement: false;
            HTMLPictureElement: false;
            HTMLPreElement: false;
            HTMLProgressElement: false;
            HTMLQuoteElement: false;
            HTMLScriptElement: false;
            HTMLSelectElement: false;
            HTMLSlotElement: false;
            HTMLSourceElement: false;
            HTMLSpanElement: false;
            HTMLStyleElement: false;
            HTMLTableCaptionElement: false;
            HTMLTableCellElement: false;
            HTMLTableColElement: false;
            HTMLTableElement: false;
            HTMLTableRowElement: false;
            HTMLTableSectionElement: false;
            HTMLTemplateElement: false;
            HTMLTextAreaElement: false;
            HTMLTimeElement: false;
            HTMLTitleElement: false;
            HTMLTrackElement: false;
            HTMLUListElement: false;
            HTMLUnknownElement: false;
            HTMLVideoElement: false;
            IDBCursor: false;
            IDBCursorWithValue: false;
            IDBDatabase: false;
            IDBFactory: false;
            IDBIndex: false;
            IDBKeyRange: false;
            IDBObjectStore: false;
            IDBOpenDBRequest: false;
            IDBRequest: false;
            IDBTransaction: false;
            IDBVersionChangeEvent: false;
            IdentityCredential: false;
            IdentityCredentialError: false;
            IdentityProvider: false;
            IdleDeadline: false;
            IdleDetector: false;
            IIRFilterNode: false;
            Image: false;
            ImageBitmap: false;
            ImageBitmapRenderingContext: false;
            ImageCapture: false;
            ImageData: false;
            ImageDecoder: false;
            ImageTrack: false;
            ImageTrackList: false;
            indexedDB: false;
            Ink: false;
            innerHeight: false;
            innerWidth: false;
            InputDeviceCapabilities: false;
            InputDeviceInfo: false;
            InputEvent: false;
            IntersectionObserver: false;
            IntersectionObserverEntry: false;
            isSecureContext: false;
            Keyboard: false;
            KeyboardEvent: false;
            KeyboardLayoutMap: false;
            KeyframeEffect: false;
            LargestContentfulPaint: false;
            LaunchParams: false;
            launchQueue: false;
            LaunchQueue: false;
            LayoutShift: false;
            LayoutShiftAttribution: false;
            length: false;
            LinearAccelerationSensor: false;
            localStorage: false;
            location: true;
            Location: false;
            locationbar: false;
            Lock: false;
            LockManager: false;
            matchMedia: false;
            MathMLElement: false;
            MediaCapabilities: false;
            MediaCapabilitiesInfo: false;
            MediaDeviceInfo: false;
            MediaDevices: false;
            MediaElementAudioSourceNode: false;
            MediaEncryptedEvent: false;
            MediaError: false;
            MediaKeyError: false;
            MediaKeyMessageEvent: false;
            MediaKeys: false;
            MediaKeySession: false;
            MediaKeyStatusMap: false;
            MediaKeySystemAccess: false;
            MediaList: false;
            MediaMetadata: false;
            MediaQueryList: false;
            MediaQueryListEvent: false;
            MediaRecorder: false;
            MediaRecorderErrorEvent: false;
            MediaSession: false;
            MediaSource: false;
            MediaSourceHandle: false;
            MediaStream: false;
            MediaStreamAudioDestinationNode: false;
            MediaStreamAudioSourceNode: false;
            MediaStreamEvent: false;
            MediaStreamTrack: false;
            MediaStreamTrackAudioSourceNode: false;
            MediaStreamTrackAudioStats: false;
            MediaStreamTrackEvent: false;
            MediaStreamTrackGenerator: false;
            MediaStreamTrackProcessor: false;
            MediaStreamTrackVideoStats: false;
            menubar: false;
            MessageChannel: false;
            MessageEvent: false;
            MessagePort: false;
            MIDIAccess: false;
            MIDIConnectionEvent: false;
            MIDIInput: false;
            MIDIInputMap: false;
            MIDIMessageEvent: false;
            MIDIOutput: false;
            MIDIOutputMap: false;
            MIDIPort: false;
            MimeType: false;
            MimeTypeArray: false;
            model: false;
            ModelGenericSession: false;
            ModelManager: false;
            MouseEvent: false;
            moveBy: false;
            moveTo: false;
            MutationEvent: false;
            MutationObserver: false;
            MutationRecord: false;
            name: false;
            NamedNodeMap: false;
            NavigateEvent: false;
            navigation: false;
            Navigation: false;
            NavigationActivation: false;
            NavigationCurrentEntryChangeEvent: false;
            NavigationDestination: false;
            NavigationHistoryEntry: false;
            NavigationPreloadManager: false;
            NavigationTransition: false;
            navigator: false;
            Navigator: false;
            NavigatorLogin: false;
            NavigatorManagedData: false;
            NavigatorUAData: false;
            NetworkInformation: false;
            Node: false;
            NodeFilter: false;
            NodeIterator: false;
            NodeList: false;
            Notification: false;
            NotifyPaintEvent: false;
            NotRestoredReasonDetails: false;
            NotRestoredReasons: false;
            OfflineAudioCompletionEvent: false;
            OfflineAudioContext: false;
            offscreenBuffering: false;
            OffscreenCanvas: false;
            OffscreenCanvasRenderingContext2D: false;
            onabort: true;
            onafterprint: true;
            onanimationcancel: true;
            onanimationend: true;
            onanimationiteration: true;
            onanimationstart: true;
            onappinstalled: true;
            onauxclick: true;
            onbeforeinput: true;
            onbeforeinstallprompt: true;
            onbeforematch: true;
            onbeforeprint: true;
            onbeforetoggle: true;
            onbeforeunload: true;
            onbeforexrselect: true;
            onblur: true;
            oncancel: true;
            oncanplay: true;
            oncanplaythrough: true;
            onchange: true;
            onclick: true;
            onclose: true;
            oncontentvisibilityautostatechange: true;
            oncontextlost: true;
            oncontextmenu: true;
            oncontextrestored: true;
            oncopy: true;
            oncuechange: true;
            oncut: true;
            ondblclick: true;
            ondevicemotion: true;
            ondeviceorientation: true;
            ondeviceorientationabsolute: true;
            ondrag: true;
            ondragend: true;
            ondragenter: true;
            ondragleave: true;
            ondragover: true;
            ondragstart: true;
            ondrop: true;
            ondurationchange: true;
            onemptied: true;
            onended: true;
            onerror: true;
            onfocus: true;
            onformdata: true;
            ongamepadconnected: true;
            ongamepaddisconnected: true;
            ongotpointercapture: true;
            onhashchange: true;
            oninput: true;
            oninvalid: true;
            onkeydown: true;
            onkeypress: true;
            onkeyup: true;
            onlanguagechange: true;
            onload: true;
            onloadeddata: true;
            onloadedmetadata: true;
            onloadstart: true;
            onlostpointercapture: true;
            onmessage: true;
            onmessageerror: true;
            onmousedown: true;
            onmouseenter: true;
            onmouseleave: true;
            onmousemove: true;
            onmouseout: true;
            onmouseover: true;
            onmouseup: true;
            onmousewheel: true;
            onoffline: true;
            ononline: true;
            onpagehide: true;
            onpagereveal: true;
            onpageshow: true;
            onpageswap: true;
            onpaste: true;
            onpause: true;
            onplay: true;
            onplaying: true;
            onpointercancel: true;
            onpointerdown: true;
            onpointerenter: true;
            onpointerleave: true;
            onpointermove: true;
            onpointerout: true;
            onpointerover: true;
            onpointerrawupdate: true;
            onpointerup: true;
            onpopstate: true;
            onprogress: true;
            onratechange: true;
            onrejectionhandled: true;
            onreset: true;
            onresize: true;
            onscroll: true;
            onscrollend: true;
            onscrollsnapchange: true;
            onscrollsnapchanging: true;
            onsearch: true;
            onsecuritypolicyviolation: true;
            onseeked: true;
            onseeking: true;
            onselect: true;
            onselectionchange: true;
            onselectstart: true;
            onslotchange: true;
            onstalled: true;
            onstorage: true;
            onsubmit: true;
            onsuspend: true;
            ontimeupdate: true;
            ontoggle: true;
            ontransitioncancel: true;
            ontransitionend: true;
            ontransitionrun: true;
            ontransitionstart: true;
            onunhandledrejection: true;
            onunload: true;
            onvolumechange: true;
            onwaiting: true;
            onwheel: true;
            open: false;
            opener: false;
            Option: false;
            OrientationSensor: false;
            origin: false;
            originAgentCluster: false;
            OscillatorNode: false;
            OTPCredential: false;
            outerHeight: false;
            outerWidth: false;
            OverconstrainedError: false;
            PageRevealEvent: false;
            PageSwapEvent: false;
            PageTransitionEvent: false;
            pageXOffset: false;
            pageYOffset: false;
            PannerNode: false;
            parent: false;
            PasswordCredential: false;
            Path2D: false;
            PaymentAddress: false;
            PaymentManager: false;
            PaymentMethodChangeEvent: false;
            PaymentRequest: false;
            PaymentRequestUpdateEvent: false;
            PaymentResponse: false;
            performance: false;
            Performance: false;
            PerformanceElementTiming: false;
            PerformanceEntry: false;
            PerformanceEventTiming: false;
            PerformanceLongAnimationFrameTiming: false;
            PerformanceLongTaskTiming: false;
            PerformanceMark: false;
            PerformanceMeasure: false;
            PerformanceNavigation: false;
            PerformanceNavigationTiming: false;
            PerformanceObserver: false;
            PerformanceObserverEntryList: false;
            PerformancePaintTiming: false;
            PerformanceResourceTiming: false;
            PerformanceScriptTiming: false;
            PerformanceServerTiming: false;
            PerformanceTiming: false;
            PeriodicSyncManager: false;
            PeriodicWave: false;
            Permissions: false;
            PermissionStatus: false;
            PERSISTENT: false;
            personalbar: false;
            PictureInPictureEvent: false;
            PictureInPictureWindow: false;
            Plugin: false;
            PluginArray: false;
            PointerEvent: false;
            PopStateEvent: false;
            postMessage: false;
            Presentation: false;
            PresentationAvailability: false;
            PresentationConnection: false;
            PresentationConnectionAvailableEvent: false;
            PresentationConnectionCloseEvent: false;
            PresentationConnectionList: false;
            PresentationReceiver: false;
            PresentationRequest: false;
            PressureObserver: false;
            PressureRecord: false;
            print: false;
            ProcessingInstruction: false;
            Profiler: false;
            ProgressEvent: false;
            PromiseRejectionEvent: false;
            prompt: false;
            ProtectedAudience: false;
            PublicKeyCredential: false;
            PushManager: false;
            PushSubscription: false;
            PushSubscriptionOptions: false;
            queryLocalFonts: false;
            queueMicrotask: false;
            RadioNodeList: false;
            Range: false;
            ReadableByteStreamController: false;
            ReadableStream: false;
            ReadableStreamBYOBReader: false;
            ReadableStreamBYOBRequest: false;
            ReadableStreamDefaultController: false;
            ReadableStreamDefaultReader: false;
            registerProcessor: false;
            RelativeOrientationSensor: false;
            RemotePlayback: false;
            removeEventListener: false;
            reportError: false;
            ReportingObserver: false;
            Request: false;
            requestAnimationFrame: false;
            requestIdleCallback: false;
            resizeBy: false;
            ResizeObserver: false;
            ResizeObserverEntry: false;
            ResizeObserverSize: false;
            resizeTo: false;
            Response: false;
            RTCCertificate: false;
            RTCDataChannel: false;
            RTCDataChannelEvent: false;
            RTCDtlsTransport: false;
            RTCDTMFSender: false;
            RTCDTMFToneChangeEvent: false;
            RTCEncodedAudioFrame: false;
            RTCEncodedVideoFrame: false;
            RTCError: false;
            RTCErrorEvent: false;
            RTCIceCandidate: false;
            RTCIceTransport: false;
            RTCPeerConnection: false;
            RTCPeerConnectionIceErrorEvent: false;
            RTCPeerConnectionIceEvent: false;
            RTCRtpReceiver: false;
            RTCRtpScriptTransform: false;
            RTCRtpSender: false;
            RTCRtpTransceiver: false;
            RTCSctpTransport: false;
            RTCSessionDescription: false;
            RTCStatsReport: false;
            RTCTrackEvent: false;
            sampleRate: false;
            scheduler: false;
            Scheduler: false;
            Scheduling: false;
            screen: false;
            Screen: false;
            ScreenDetailed: false;
            ScreenDetails: false;
            screenLeft: false;
            ScreenOrientation: false;
            screenTop: false;
            screenX: false;
            screenY: false;
            ScriptProcessorNode: false;
            scroll: false;
            scrollbars: false;
            scrollBy: false;
            ScrollTimeline: false;
            scrollTo: false;
            scrollX: false;
            scrollY: false;
            SecurityPolicyViolationEvent: false;
            Selection: false;
            self: false;
            Sensor: false;
            SensorErrorEvent: false;
            Serial: false;
            SerialPort: false;
            ServiceWorker: false;
            ServiceWorkerContainer: false;
            ServiceWorkerRegistration: false;
            sessionStorage: false;
            setInterval: false;
            setTimeout: false;
            ShadowRoot: false;
            sharedStorage: false;
            SharedStorage: false;
            SharedStorageWorklet: false;
            SharedWorker: false;
            showDirectoryPicker: false;
            showOpenFilePicker: false;
            showSaveFilePicker: false;
            SnapEvent: false;
            SourceBuffer: false;
            SourceBufferList: false;
            speechSynthesis: false;
            SpeechSynthesis: false;
            SpeechSynthesisErrorEvent: false;
            SpeechSynthesisEvent: false;
            SpeechSynthesisUtterance: false;
            SpeechSynthesisVoice: false;
            StaticRange: false;
            status: false;
            statusbar: false;
            StereoPannerNode: false;
            stop: false;
            Storage: false;
            StorageBucket: false;
            StorageBucketManager: false;
            StorageEvent: false;
            StorageManager: false;
            structuredClone: false;
            styleMedia: false;
            StylePropertyMap: false;
            StylePropertyMapReadOnly: false;
            StyleSheet: false;
            StyleSheetList: false;
            SubmitEvent: false;
            SubtleCrypto: false;
            SVGAElement: false;
            SVGAngle: false;
            SVGAnimatedAngle: false;
            SVGAnimatedBoolean: false;
            SVGAnimatedEnumeration: false;
            SVGAnimatedInteger: false;
            SVGAnimatedLength: false;
            SVGAnimatedLengthList: false;
            SVGAnimatedNumber: false;
            SVGAnimatedNumberList: false;
            SVGAnimatedPreserveAspectRatio: false;
            SVGAnimatedRect: false;
            SVGAnimatedString: false;
            SVGAnimatedTransformList: false;
            SVGAnimateElement: false;
            SVGAnimateMotionElement: false;
            SVGAnimateTransformElement: false;
            SVGAnimationElement: false;
            SVGCircleElement: false;
            SVGClipPathElement: false;
            SVGComponentTransferFunctionElement: false;
            SVGDefsElement: false;
            SVGDescElement: false;
            SVGElement: false;
            SVGEllipseElement: false;
            SVGFEBlendElement: false;
            SVGFEColorMatrixElement: false;
            SVGFEComponentTransferElement: false;
            SVGFECompositeElement: false;
            SVGFEConvolveMatrixElement: false;
            SVGFEDiffuseLightingElement: false;
            SVGFEDisplacementMapElement: false;
            SVGFEDistantLightElement: false;
            SVGFEDropShadowElement: false;
            SVGFEFloodElement: false;
            SVGFEFuncAElement: false;
            SVGFEFuncBElement: false;
            SVGFEFuncGElement: false;
            SVGFEFuncRElement: false;
            SVGFEGaussianBlurElement: false;
            SVGFEImageElement: false;
            SVGFEMergeElement: false;
            SVGFEMergeNodeElement: false;
            SVGFEMorphologyElement: false;
            SVGFEOffsetElement: false;
            SVGFEPointLightElement: false;
            SVGFESpecularLightingElement: false;
            SVGFESpotLightElement: false;
            SVGFETileElement: false;
            SVGFETurbulenceElement: false;
            SVGFilterElement: false;
            SVGForeignObjectElement: false;
            SVGGElement: false;
            SVGGeometryElement: false;
            SVGGradientElement: false;
            SVGGraphicsElement: false;
            SVGImageElement: false;
            SVGLength: false;
            SVGLengthList: false;
            SVGLinearGradientElement: false;
            SVGLineElement: false;
            SVGMarkerElement: false;
            SVGMaskElement: false;
            SVGMatrix: false;
            SVGMetadataElement: false;
            SVGMPathElement: false;
            SVGNumber: false;
            SVGNumberList: false;
            SVGPathElement: false;
            SVGPatternElement: false;
            SVGPoint: false;
            SVGPointList: false;
            SVGPolygonElement: false;
            SVGPolylineElement: false;
            SVGPreserveAspectRatio: false;
            SVGRadialGradientElement: false;
            SVGRect: false;
            SVGRectElement: false;
            SVGScriptElement: false;
            SVGSetElement: false;
            SVGStopElement: false;
            SVGStringList: false;
            SVGStyleElement: false;
            SVGSVGElement: false;
            SVGSwitchElement: false;
            SVGSymbolElement: false;
            SVGTextContentElement: false;
            SVGTextElement: false;
            SVGTextPathElement: false;
            SVGTextPositioningElement: false;
            SVGTitleElement: false;
            SVGTransform: false;
            SVGTransformList: false;
            SVGTSpanElement: false;
            SVGUnitTypes: false;
            SVGUseElement: false;
            SVGViewElement: false;
            SyncManager: false;
            TaskAttributionTiming: false;
            TaskController: false;
            TaskPriorityChangeEvent: false;
            TaskSignal: false;
            TEMPORARY: false;
            Text: false;
            TextDecoder: false;
            TextDecoderStream: false;
            TextEncoder: false;
            TextEncoderStream: false;
            TextEvent: false;
            TextFormat: false;
            TextFormatUpdateEvent: false;
            TextMetrics: false;
            TextTrack: false;
            TextTrackCue: false;
            TextTrackCueList: false;
            TextTrackList: false;
            TextUpdateEvent: false;
            TimeEvent: false;
            TimeRanges: false;
            ToggleEvent: false;
            toolbar: false;
            top: false;
            Touch: false;
            TouchEvent: false;
            TouchList: false;
            TrackEvent: false;
            TransformStream: false;
            TransformStreamDefaultController: false;
            TransitionEvent: false;
            TreeWalker: false;
            TrustedHTML: false;
            TrustedScript: false;
            TrustedScriptURL: false;
            TrustedTypePolicy: false;
            TrustedTypePolicyFactory: false;
            trustedTypes: false;
            UIEvent: false;
            URL: false;
            URLPattern: false;
            URLSearchParams: false;
            USB: false;
            USBAlternateInterface: false;
            USBConfiguration: false;
            USBConnectionEvent: false;
            USBDevice: false;
            USBEndpoint: false;
            USBInterface: false;
            USBInTransferResult: false;
            USBIsochronousInTransferPacket: false;
            USBIsochronousInTransferResult: false;
            USBIsochronousOutTransferPacket: false;
            USBIsochronousOutTransferResult: false;
            USBOutTransferResult: false;
            UserActivation: false;
            ValidityState: false;
            VideoColorSpace: false;
            VideoDecoder: false;
            VideoEncoder: false;
            VideoFrame: false;
            VideoPlaybackQuality: false;
            ViewTimeline: false;
            ViewTransition: false;
            ViewTransitionTypeSet: false;
            VirtualKeyboard: false;
            VirtualKeyboardGeometryChangeEvent: false;
            VisibilityStateEntry: false;
            visualViewport: false;
            VisualViewport: false;
            VTTCue: false;
            VTTRegion: false;
            WakeLock: false;
            WakeLockSentinel: false;
            WaveShaperNode: false;
            WebAssembly: false;
            WebGL2RenderingContext: false;
            WebGLActiveInfo: false;
            WebGLBuffer: false;
            WebGLContextEvent: false;
            WebGLFramebuffer: false;
            WebGLObject: false;
            WebGLProgram: false;
            WebGLQuery: false;
            WebGLRenderbuffer: false;
            WebGLRenderingContext: false;
            WebGLSampler: false;
            WebGLShader: false;
            WebGLShaderPrecisionFormat: false;
            WebGLSync: false;
            WebGLTexture: false;
            WebGLTransformFeedback: false;
            WebGLUniformLocation: false;
            WebGLVertexArrayObject: false;
            WebSocket: false;
            WebSocketError: false;
            WebSocketStream: false;
            WebTransport: false;
            WebTransportBidirectionalStream: false;
            WebTransportDatagramDuplexStream: false;
            WebTransportError: false;
            WebTransportReceiveStream: false;
            WebTransportSendStream: false;
            WGSLLanguageFeatures: false;
            WheelEvent: false;
            window: false;
            Window: false;
            WindowControlsOverlay: false;
            WindowControlsOverlayGeometryChangeEvent: false;
            Worker: false;
            Worklet: false;
            WorkletGlobalScope: false;
            WritableStream: false;
            WritableStreamDefaultController: false;
            WritableStreamDefaultWriter: false;
            XMLDocument: false;
            XMLHttpRequest: false;
            XMLHttpRequestEventTarget: false;
            XMLHttpRequestUpload: false;
            XMLSerializer: false;
            XPathEvaluator: false;
            XPathExpression: false;
            XPathResult: false;
            XRAnchor: false;
            XRAnchorSet: false;
            XRBoundedReferenceSpace: false;
            XRCamera: false;
            XRCPUDepthInformation: false;
            XRDepthInformation: false;
            XRDOMOverlayState: false;
            XRFrame: false;
            XRHand: false;
            XRHitTestResult: false;
            XRHitTestSource: false;
            XRInputSource: false;
            XRInputSourceArray: false;
            XRInputSourceEvent: false;
            XRInputSourcesChangeEvent: false;
            XRJointPose: false;
            XRJointSpace: false;
            XRLayer: false;
            XRLightEstimate: false;
            XRLightProbe: false;
            XRPose: false;
            XRRay: false;
            XRReferenceSpace: false;
            XRReferenceSpaceEvent: false;
            XRRenderState: false;
            XRRigidTransform: false;
            XRSession: false;
            XRSessionEvent: false;
            XRSpace: false;
            XRSystem: false;
            XRTransientInputHitTestResult: false;
            XRTransientInputHitTestSource: false;
            XRView: false;
            XRViewerPose: false;
            XRViewport: false;
            XRWebGLBinding: false;
            XRWebGLDepthInformation: false;
            XRWebGLLayer: false;
            XSLTProcessor: false;
            __dirname: false;
            __filename: false;
            Buffer: false;
            clearImmediate: false;
            exports: true;
            global: false;
            module: false;
            process: false;
            require: false;
            setImmediate: false;
        };
    };
    rules: {
        'no-console': string;
        'no-debugger': string;
        'no-alert': string;
        'perfectionist/sort-imports': (string | {
            internalPattern: string[];
        })[];
    };
} | {
    ignores: string[];
})[];

export declare const default_alias_6: ({
    languageOptions: {
        globals: {
            AbortController: false;
            AbortSignal: false;
            AbsoluteOrientationSensor: false;
            AbstractRange: false;
            Accelerometer: false;
            addEventListener: false;
            ai: false;
            AI: false;
            AITextSession: false;
            alert: false;
            AnalyserNode: false;
            Animation: false;
            AnimationEffect: false;
            AnimationEvent: false;
            AnimationPlaybackEvent: false;
            AnimationTimeline: false;
            atob: false;
            Attr: false;
            Audio: false;
            AudioBuffer: false;
            AudioBufferSourceNode: false;
            AudioContext: false;
            AudioData: false;
            AudioDecoder: false;
            AudioDestinationNode: false;
            AudioEncoder: false;
            AudioListener: false;
            AudioNode: false;
            AudioParam: false;
            AudioParamMap: false;
            AudioProcessingEvent: false;
            AudioScheduledSourceNode: false;
            AudioSinkInfo: false;
            AudioWorklet: false;
            AudioWorkletGlobalScope: false;
            AudioWorkletNode: false;
            AudioWorkletProcessor: false;
            AuthenticatorAssertionResponse: false;
            AuthenticatorAttestationResponse: false;
            AuthenticatorResponse: false;
            BackgroundFetchManager: false;
            BackgroundFetchRecord: false;
            BackgroundFetchRegistration: false;
            BarcodeDetector: false;
            BarProp: false;
            BaseAudioContext: false;
            BatteryManager: false;
            BeforeUnloadEvent: false;
            BiquadFilterNode: false;
            Blob: false;
            BlobEvent: false;
            Bluetooth: false;
            BluetoothCharacteristicProperties: false;
            BluetoothDevice: false;
            BluetoothRemoteGATTCharacteristic: false;
            BluetoothRemoteGATTDescriptor: false;
            BluetoothRemoteGATTServer: false;
            BluetoothRemoteGATTService: false;
            BluetoothUUID: false;
            blur: false;
            BroadcastChannel: false;
            BrowserCaptureMediaStreamTrack: false;
            btoa: false;
            ByteLengthQueuingStrategy: false;
            Cache: false;
            caches: false;
            CacheStorage: false;
            cancelAnimationFrame: false;
            cancelIdleCallback: false;
            CanvasCaptureMediaStream: false;
            CanvasCaptureMediaStreamTrack: false;
            CanvasGradient: false;
            CanvasPattern: false;
            CanvasRenderingContext2D: false;
            CaptureController: false;
            CaretPosition: false;
            CDATASection: false;
            ChannelMergerNode: false;
            ChannelSplitterNode: false;
            ChapterInformation: false;
            CharacterBoundsUpdateEvent: false;
            CharacterData: false;
            clearInterval: false;
            clearTimeout: false;
            clientInformation: false;
            Clipboard: false;
            ClipboardEvent: false;
            ClipboardItem: false;
            close: false;
            closed: false;
            CloseEvent: false;
            CloseWatcher: false;
            Comment: false;
            CompositionEvent: false;
            CompressionStream: false;
            confirm: false;
            console: false;
            ConstantSourceNode: false;
            ContentVisibilityAutoStateChangeEvent: false;
            ConvolverNode: false;
            CookieChangeEvent: false;
            CookieDeprecationLabel: false;
            cookieStore: false;
            CookieStore: false;
            CookieStoreManager: false;
            CountQueuingStrategy: false;
            createImageBitmap: false;
            Credential: false;
            credentialless: false;
            CredentialsContainer: false;
            CropTarget: false;
            crossOriginIsolated: false;
            crypto: false;
            Crypto: false;
            CryptoKey: false;
            CSS: false;
            CSSAnimation: false;
            CSSConditionRule: false;
            CSSContainerRule: false;
            CSSCounterStyleRule: false;
            CSSFontFaceRule: false;
            CSSFontFeatureValuesRule: false;
            CSSFontPaletteValuesRule: false;
            CSSGroupingRule: false;
            CSSImageValue: false;
            CSSImportRule: false;
            CSSKeyframeRule: false;
            CSSKeyframesRule: false;
            CSSKeywordValue: false;
            CSSLayerBlockRule: false;
            CSSLayerStatementRule: false;
            CSSMarginRule: false;
            CSSMathClamp: false;
            CSSMathInvert: false;
            CSSMathMax: false;
            CSSMathMin: false;
            CSSMathNegate: false;
            CSSMathProduct: false;
            CSSMathSum: false;
            CSSMathValue: false;
            CSSMatrixComponent: false;
            CSSMediaRule: false;
            CSSNamespaceRule: false;
            CSSNestedDeclarations: false;
            CSSNumericArray: false;
            CSSNumericValue: false;
            CSSPageDescriptors: false;
            CSSPageRule: false;
            CSSPerspective: false;
            CSSPositionTryDescriptors: false;
            CSSPositionTryRule: false;
            CSSPositionValue: false;
            CSSPropertyRule: false;
            CSSRotate: false;
            CSSRule: false;
            CSSRuleList: false;
            CSSScale: false;
            CSSScopeRule: false;
            CSSSkew: false;
            CSSSkewX: false;
            CSSSkewY: false;
            CSSStartingStyleRule: false;
            CSSStyleDeclaration: false;
            CSSStyleRule: false;
            CSSStyleSheet: false;
            CSSStyleValue: false;
            CSSSupportsRule: false;
            CSSTransformComponent: false;
            CSSTransformValue: false;
            CSSTransition: false;
            CSSTranslate: false;
            CSSUnitValue: false;
            CSSUnparsedValue: false;
            CSSVariableReferenceValue: false;
            CSSViewTransitionRule: false;
            currentFrame: false;
            currentTime: false;
            CustomElementRegistry: false;
            customElements: false;
            CustomEvent: false;
            CustomStateSet: false;
            DataTransfer: false;
            DataTransferItem: false;
            DataTransferItemList: false;
            DecompressionStream: false;
            DelayNode: false;
            DelegatedInkTrailPresenter: false;
            DeviceMotionEvent: false;
            DeviceMotionEventAcceleration: false;
            DeviceMotionEventRotationRate: false;
            DeviceOrientationEvent: false;
            devicePixelRatio: false;
            dispatchEvent: false;
            document: false;
            Document: false;
            DocumentFragment: false;
            documentPictureInPicture: false;
            DocumentPictureInPicture: false;
            DocumentPictureInPictureEvent: false;
            DocumentTimeline: false;
            DocumentType: false;
            DOMError: false;
            DOMException: false;
            DOMImplementation: false;
            DOMMatrix: false;
            DOMMatrixReadOnly: false;
            DOMParser: false;
            DOMPoint: false;
            DOMPointReadOnly: false;
            DOMQuad: false;
            DOMRect: false;
            DOMRectList: false;
            DOMRectReadOnly: false;
            DOMStringList: false;
            DOMStringMap: false;
            DOMTokenList: false;
            DragEvent: false;
            DynamicsCompressorNode: false;
            EditContext: false;
            Element: false;
            ElementInternals: false;
            EncodedAudioChunk: false;
            EncodedVideoChunk: false;
            ErrorEvent: false;
            event: false;
            Event: false;
            EventCounts: false;
            EventSource: false;
            EventTarget: false;
            external: false;
            External: false;
            EyeDropper: false;
            FeaturePolicy: false;
            FederatedCredential: false;
            fence: false;
            Fence: false;
            FencedFrameConfig: false;
            fetch: false;
            fetchLater: false;
            FetchLaterResult: false;
            File: false;
            FileList: false;
            FileReader: false;
            FileSystem: false;
            FileSystemDirectoryEntry: false;
            FileSystemDirectoryHandle: false;
            FileSystemDirectoryReader: false;
            FileSystemEntry: false;
            FileSystemFileEntry: false;
            FileSystemFileHandle: false;
            FileSystemHandle: false;
            FileSystemWritableFileStream: false;
            find: false;
            Float16Array: false;
            focus: false;
            FocusEvent: false;
            FontData: false;
            FontFace: false;
            FontFaceSet: false;
            FontFaceSetLoadEvent: false;
            FormData: false;
            FormDataEvent: false;
            FragmentDirective: false;
            frameElement: false;
            frames: false;
            GainNode: false;
            Gamepad: false;
            GamepadAxisMoveEvent: false;
            GamepadButton: false;
            GamepadButtonEvent: false;
            GamepadEvent: false;
            GamepadHapticActuator: false;
            GamepadPose: false;
            Geolocation: false;
            GeolocationCoordinates: false;
            GeolocationPosition: false;
            GeolocationPositionError: false;
            getComputedStyle: false;
            getScreenDetails: false;
            getSelection: false;
            GPU: false;
            GPUAdapter: false;
            GPUAdapterInfo: false;
            GPUBindGroup: false;
            GPUBindGroupLayout: false;
            GPUBuffer: false;
            GPUBufferUsage: false;
            GPUCanvasContext: false;
            GPUColorWrite: false;
            GPUCommandBuffer: false;
            GPUCommandEncoder: false;
            GPUCompilationInfo: false;
            GPUCompilationMessage: false;
            GPUComputePassEncoder: false;
            GPUComputePipeline: false;
            GPUDevice: false;
            GPUDeviceLostInfo: false;
            GPUError: false;
            GPUExternalTexture: false;
            GPUInternalError: false;
            GPUMapMode: false;
            GPUOutOfMemoryError: false;
            GPUPipelineError: false;
            GPUPipelineLayout: false;
            GPUQuerySet: false;
            GPUQueue: false;
            GPURenderBundle: false;
            GPURenderBundleEncoder: false;
            GPURenderPassEncoder: false;
            GPURenderPipeline: false;
            GPUSampler: false;
            GPUShaderModule: false;
            GPUShaderStage: false;
            GPUSupportedFeatures: false;
            GPUSupportedLimits: false;
            GPUTexture: false;
            GPUTextureUsage: false;
            GPUTextureView: false;
            GPUUncapturedErrorEvent: false;
            GPUValidationError: false;
            GravitySensor: false;
            Gyroscope: false;
            HashChangeEvent: false;
            Headers: false;
            HID: false;
            HIDConnectionEvent: false;
            HIDDevice: false;
            HIDInputReportEvent: false;
            Highlight: false;
            HighlightRegistry: false;
            history: false;
            History: false;
            HTMLAllCollection: false;
            HTMLAnchorElement: false;
            HTMLAreaElement: false;
            HTMLAudioElement: false;
            HTMLBaseElement: false;
            HTMLBodyElement: false;
            HTMLBRElement: false;
            HTMLButtonElement: false;
            HTMLCanvasElement: false;
            HTMLCollection: false;
            HTMLDataElement: false;
            HTMLDataListElement: false;
            HTMLDetailsElement: false;
            HTMLDialogElement: false;
            HTMLDirectoryElement: false;
            HTMLDivElement: false;
            HTMLDListElement: false;
            HTMLDocument: false;
            HTMLElement: false;
            HTMLEmbedElement: false;
            HTMLFencedFrameElement: false;
            HTMLFieldSetElement: false;
            HTMLFontElement: false;
            HTMLFormControlsCollection: false;
            HTMLFormElement: false;
            HTMLFrameElement: false;
            HTMLFrameSetElement: false;
            HTMLHeadElement: false;
            HTMLHeadingElement: false;
            HTMLHRElement: false;
            HTMLHtmlElement: false;
            HTMLIFrameElement: false;
            HTMLImageElement: false;
            HTMLInputElement: false;
            HTMLLabelElement: false;
            HTMLLegendElement: false;
            HTMLLIElement: false;
            HTMLLinkElement: false;
            HTMLMapElement: false;
            HTMLMarqueeElement: false;
            HTMLMediaElement: false;
            HTMLMenuElement: false;
            HTMLMetaElement: false;
            HTMLMeterElement: false;
            HTMLModElement: false;
            HTMLObjectElement: false;
            HTMLOListElement: false;
            HTMLOptGroupElement: false;
            HTMLOptionElement: false;
            HTMLOptionsCollection: false;
            HTMLOutputElement: false;
            HTMLParagraphElement: false;
            HTMLParamElement: false;
            HTMLPictureElement: false;
            HTMLPreElement: false;
            HTMLProgressElement: false;
            HTMLQuoteElement: false;
            HTMLScriptElement: false;
            HTMLSelectElement: false;
            HTMLSlotElement: false;
            HTMLSourceElement: false;
            HTMLSpanElement: false;
            HTMLStyleElement: false;
            HTMLTableCaptionElement: false;
            HTMLTableCellElement: false;
            HTMLTableColElement: false;
            HTMLTableElement: false;
            HTMLTableRowElement: false;
            HTMLTableSectionElement: false;
            HTMLTemplateElement: false;
            HTMLTextAreaElement: false;
            HTMLTimeElement: false;
            HTMLTitleElement: false;
            HTMLTrackElement: false;
            HTMLUListElement: false;
            HTMLUnknownElement: false;
            HTMLVideoElement: false;
            IDBCursor: false;
            IDBCursorWithValue: false;
            IDBDatabase: false;
            IDBFactory: false;
            IDBIndex: false;
            IDBKeyRange: false;
            IDBObjectStore: false;
            IDBOpenDBRequest: false;
            IDBRequest: false;
            IDBTransaction: false;
            IDBVersionChangeEvent: false;
            IdentityCredential: false;
            IdentityCredentialError: false;
            IdentityProvider: false;
            IdleDeadline: false;
            IdleDetector: false;
            IIRFilterNode: false;
            Image: false;
            ImageBitmap: false;
            ImageBitmapRenderingContext: false;
            ImageCapture: false;
            ImageData: false;
            ImageDecoder: false;
            ImageTrack: false;
            ImageTrackList: false;
            indexedDB: false;
            Ink: false;
            innerHeight: false;
            innerWidth: false;
            InputDeviceCapabilities: false;
            InputDeviceInfo: false;
            InputEvent: false;
            IntersectionObserver: false;
            IntersectionObserverEntry: false;
            isSecureContext: false;
            Keyboard: false;
            KeyboardEvent: false;
            KeyboardLayoutMap: false;
            KeyframeEffect: false;
            LargestContentfulPaint: false;
            LaunchParams: false;
            launchQueue: false;
            LaunchQueue: false;
            LayoutShift: false;
            LayoutShiftAttribution: false;
            length: false;
            LinearAccelerationSensor: false;
            localStorage: false;
            location: true;
            Location: false;
            locationbar: false;
            Lock: false;
            LockManager: false;
            matchMedia: false;
            MathMLElement: false;
            MediaCapabilities: false;
            MediaCapabilitiesInfo: false;
            MediaDeviceInfo: false;
            MediaDevices: false;
            MediaElementAudioSourceNode: false;
            MediaEncryptedEvent: false;
            MediaError: false;
            MediaKeyError: false;
            MediaKeyMessageEvent: false;
            MediaKeys: false;
            MediaKeySession: false;
            MediaKeyStatusMap: false;
            MediaKeySystemAccess: false;
            MediaList: false;
            MediaMetadata: false;
            MediaQueryList: false;
            MediaQueryListEvent: false;
            MediaRecorder: false;
            MediaRecorderErrorEvent: false;
            MediaSession: false;
            MediaSource: false;
            MediaSourceHandle: false;
            MediaStream: false;
            MediaStreamAudioDestinationNode: false;
            MediaStreamAudioSourceNode: false;
            MediaStreamEvent: false;
            MediaStreamTrack: false;
            MediaStreamTrackAudioSourceNode: false;
            MediaStreamTrackAudioStats: false;
            MediaStreamTrackEvent: false;
            MediaStreamTrackGenerator: false;
            MediaStreamTrackProcessor: false;
            MediaStreamTrackVideoStats: false;
            menubar: false;
            MessageChannel: false;
            MessageEvent: false;
            MessagePort: false;
            MIDIAccess: false;
            MIDIConnectionEvent: false;
            MIDIInput: false;
            MIDIInputMap: false;
            MIDIMessageEvent: false;
            MIDIOutput: false;
            MIDIOutputMap: false;
            MIDIPort: false;
            MimeType: false;
            MimeTypeArray: false;
            model: false;
            ModelGenericSession: false;
            ModelManager: false;
            MouseEvent: false;
            moveBy: false;
            moveTo: false;
            MutationEvent: false;
            MutationObserver: false;
            MutationRecord: false;
            name: false;
            NamedNodeMap: false;
            NavigateEvent: false;
            navigation: false;
            Navigation: false;
            NavigationActivation: false;
            NavigationCurrentEntryChangeEvent: false;
            NavigationDestination: false;
            NavigationHistoryEntry: false;
            NavigationPreloadManager: false;
            NavigationTransition: false;
            navigator: false;
            Navigator: false;
            NavigatorLogin: false;
            NavigatorManagedData: false;
            NavigatorUAData: false;
            NetworkInformation: false;
            Node: false;
            NodeFilter: false;
            NodeIterator: false;
            NodeList: false;
            Notification: false;
            NotifyPaintEvent: false;
            NotRestoredReasonDetails: false;
            NotRestoredReasons: false;
            OfflineAudioCompletionEvent: false;
            OfflineAudioContext: false;
            offscreenBuffering: false;
            OffscreenCanvas: false;
            OffscreenCanvasRenderingContext2D: false;
            onabort: true;
            onafterprint: true;
            onanimationcancel: true;
            onanimationend: true;
            onanimationiteration: true;
            onanimationstart: true;
            onappinstalled: true;
            onauxclick: true;
            onbeforeinput: true;
            onbeforeinstallprompt: true;
            onbeforematch: true;
            onbeforeprint: true;
            onbeforetoggle: true;
            onbeforeunload: true;
            onbeforexrselect: true;
            onblur: true;
            oncancel: true;
            oncanplay: true;
            oncanplaythrough: true;
            onchange: true;
            onclick: true;
            onclose: true;
            oncontentvisibilityautostatechange: true;
            oncontextlost: true;
            oncontextmenu: true;
            oncontextrestored: true;
            oncopy: true;
            oncuechange: true;
            oncut: true;
            ondblclick: true;
            ondevicemotion: true;
            ondeviceorientation: true;
            ondeviceorientationabsolute: true;
            ondrag: true;
            ondragend: true;
            ondragenter: true;
            ondragleave: true;
            ondragover: true;
            ondragstart: true;
            ondrop: true;
            ondurationchange: true;
            onemptied: true;
            onended: true;
            onerror: true;
            onfocus: true;
            onformdata: true;
            ongamepadconnected: true;
            ongamepaddisconnected: true;
            ongotpointercapture: true;
            onhashchange: true;
            oninput: true;
            oninvalid: true;
            onkeydown: true;
            onkeypress: true;
            onkeyup: true;
            onlanguagechange: true;
            onload: true;
            onloadeddata: true;
            onloadedmetadata: true;
            onloadstart: true;
            onlostpointercapture: true;
            onmessage: true;
            onmessageerror: true;
            onmousedown: true;
            onmouseenter: true;
            onmouseleave: true;
            onmousemove: true;
            onmouseout: true;
            onmouseover: true;
            onmouseup: true;
            onmousewheel: true;
            onoffline: true;
            ononline: true;
            onpagehide: true;
            onpagereveal: true;
            onpageshow: true;
            onpageswap: true;
            onpaste: true;
            onpause: true;
            onplay: true;
            onplaying: true;
            onpointercancel: true;
            onpointerdown: true;
            onpointerenter: true;
            onpointerleave: true;
            onpointermove: true;
            onpointerout: true;
            onpointerover: true;
            onpointerrawupdate: true;
            onpointerup: true;
            onpopstate: true;
            onprogress: true;
            onratechange: true;
            onrejectionhandled: true;
            onreset: true;
            onresize: true;
            onscroll: true;
            onscrollend: true;
            onscrollsnapchange: true;
            onscrollsnapchanging: true;
            onsearch: true;
            onsecuritypolicyviolation: true;
            onseeked: true;
            onseeking: true;
            onselect: true;
            onselectionchange: true;
            onselectstart: true;
            onslotchange: true;
            onstalled: true;
            onstorage: true;
            onsubmit: true;
            onsuspend: true;
            ontimeupdate: true;
            ontoggle: true;
            ontransitioncancel: true;
            ontransitionend: true;
            ontransitionrun: true;
            ontransitionstart: true;
            onunhandledrejection: true;
            onunload: true;
            onvolumechange: true;
            onwaiting: true;
            onwheel: true;
            open: false;
            opener: false;
            Option: false;
            OrientationSensor: false;
            origin: false;
            originAgentCluster: false;
            OscillatorNode: false;
            OTPCredential: false;
            outerHeight: false;
            outerWidth: false;
            OverconstrainedError: false;
            PageRevealEvent: false;
            PageSwapEvent: false;
            PageTransitionEvent: false;
            pageXOffset: false;
            pageYOffset: false;
            PannerNode: false;
            parent: false;
            PasswordCredential: false;
            Path2D: false;
            PaymentAddress: false;
            PaymentManager: false;
            PaymentMethodChangeEvent: false;
            PaymentRequest: false;
            PaymentRequestUpdateEvent: false;
            PaymentResponse: false;
            performance: false;
            Performance: false;
            PerformanceElementTiming: false;
            PerformanceEntry: false;
            PerformanceEventTiming: false;
            PerformanceLongAnimationFrameTiming: false;
            PerformanceLongTaskTiming: false;
            PerformanceMark: false;
            PerformanceMeasure: false;
            PerformanceNavigation: false;
            PerformanceNavigationTiming: false;
            PerformanceObserver: false;
            PerformanceObserverEntryList: false;
            PerformancePaintTiming: false;
            PerformanceResourceTiming: false;
            PerformanceScriptTiming: false;
            PerformanceServerTiming: false;
            PerformanceTiming: false;
            PeriodicSyncManager: false;
            PeriodicWave: false;
            Permissions: false;
            PermissionStatus: false;
            PERSISTENT: false;
            personalbar: false;
            PictureInPictureEvent: false;
            PictureInPictureWindow: false;
            Plugin: false;
            PluginArray: false;
            PointerEvent: false;
            PopStateEvent: false;
            postMessage: false;
            Presentation: false;
            PresentationAvailability: false;
            PresentationConnection: false;
            PresentationConnectionAvailableEvent: false;
            PresentationConnectionCloseEvent: false;
            PresentationConnectionList: false;
            PresentationReceiver: false;
            PresentationRequest: false;
            PressureObserver: false;
            PressureRecord: false;
            print: false;
            ProcessingInstruction: false;
            Profiler: false;
            ProgressEvent: false;
            PromiseRejectionEvent: false;
            prompt: false;
            ProtectedAudience: false;
            PublicKeyCredential: false;
            PushManager: false;
            PushSubscription: false;
            PushSubscriptionOptions: false;
            queryLocalFonts: false;
            queueMicrotask: false;
            RadioNodeList: false;
            Range: false;
            ReadableByteStreamController: false;
            ReadableStream: false;
            ReadableStreamBYOBReader: false;
            ReadableStreamBYOBRequest: false;
            ReadableStreamDefaultController: false;
            ReadableStreamDefaultReader: false;
            registerProcessor: false;
            RelativeOrientationSensor: false;
            RemotePlayback: false;
            removeEventListener: false;
            reportError: false;
            ReportingObserver: false;
            Request: false;
            requestAnimationFrame: false;
            requestIdleCallback: false;
            resizeBy: false;
            ResizeObserver: false;
            ResizeObserverEntry: false;
            ResizeObserverSize: false;
            resizeTo: false;
            Response: false;
            RTCCertificate: false;
            RTCDataChannel: false;
            RTCDataChannelEvent: false;
            RTCDtlsTransport: false;
            RTCDTMFSender: false;
            RTCDTMFToneChangeEvent: false;
            RTCEncodedAudioFrame: false;
            RTCEncodedVideoFrame: false;
            RTCError: false;
            RTCErrorEvent: false;
            RTCIceCandidate: false;
            RTCIceTransport: false;
            RTCPeerConnection: false;
            RTCPeerConnectionIceErrorEvent: false;
            RTCPeerConnectionIceEvent: false;
            RTCRtpReceiver: false;
            RTCRtpScriptTransform: false;
            RTCRtpSender: false;
            RTCRtpTransceiver: false;
            RTCSctpTransport: false;
            RTCSessionDescription: false;
            RTCStatsReport: false;
            RTCTrackEvent: false;
            sampleRate: false;
            scheduler: false;
            Scheduler: false;
            Scheduling: false;
            screen: false;
            Screen: false;
            ScreenDetailed: false;
            ScreenDetails: false;
            screenLeft: false;
            ScreenOrientation: false;
            screenTop: false;
            screenX: false;
            screenY: false;
            ScriptProcessorNode: false;
            scroll: false;
            scrollbars: false;
            scrollBy: false;
            ScrollTimeline: false;
            scrollTo: false;
            scrollX: false;
            scrollY: false;
            SecurityPolicyViolationEvent: false;
            Selection: false;
            self: false;
            Sensor: false;
            SensorErrorEvent: false;
            Serial: false;
            SerialPort: false;
            ServiceWorker: false;
            ServiceWorkerContainer: false;
            ServiceWorkerRegistration: false;
            sessionStorage: false;
            setInterval: false;
            setTimeout: false;
            ShadowRoot: false;
            sharedStorage: false;
            SharedStorage: false;
            SharedStorageWorklet: false;
            SharedWorker: false;
            showDirectoryPicker: false;
            showOpenFilePicker: false;
            showSaveFilePicker: false;
            SnapEvent: false;
            SourceBuffer: false;
            SourceBufferList: false;
            speechSynthesis: false;
            SpeechSynthesis: false;
            SpeechSynthesisErrorEvent: false;
            SpeechSynthesisEvent: false;
            SpeechSynthesisUtterance: false;
            SpeechSynthesisVoice: false;
            StaticRange: false;
            status: false;
            statusbar: false;
            StereoPannerNode: false;
            stop: false;
            Storage: false;
            StorageBucket: false;
            StorageBucketManager: false;
            StorageEvent: false;
            StorageManager: false;
            structuredClone: false;
            styleMedia: false;
            StylePropertyMap: false;
            StylePropertyMapReadOnly: false;
            StyleSheet: false;
            StyleSheetList: false;
            SubmitEvent: false;
            SubtleCrypto: false;
            SVGAElement: false;
            SVGAngle: false;
            SVGAnimatedAngle: false;
            SVGAnimatedBoolean: false;
            SVGAnimatedEnumeration: false;
            SVGAnimatedInteger: false;
            SVGAnimatedLength: false;
            SVGAnimatedLengthList: false;
            SVGAnimatedNumber: false;
            SVGAnimatedNumberList: false;
            SVGAnimatedPreserveAspectRatio: false;
            SVGAnimatedRect: false;
            SVGAnimatedString: false;
            SVGAnimatedTransformList: false;
            SVGAnimateElement: false;
            SVGAnimateMotionElement: false;
            SVGAnimateTransformElement: false;
            SVGAnimationElement: false;
            SVGCircleElement: false;
            SVGClipPathElement: false;
            SVGComponentTransferFunctionElement: false;
            SVGDefsElement: false;
            SVGDescElement: false;
            SVGElement: false;
            SVGEllipseElement: false;
            SVGFEBlendElement: false;
            SVGFEColorMatrixElement: false;
            SVGFEComponentTransferElement: false;
            SVGFECompositeElement: false;
            SVGFEConvolveMatrixElement: false;
            SVGFEDiffuseLightingElement: false;
            SVGFEDisplacementMapElement: false;
            SVGFEDistantLightElement: false;
            SVGFEDropShadowElement: false;
            SVGFEFloodElement: false;
            SVGFEFuncAElement: false;
            SVGFEFuncBElement: false;
            SVGFEFuncGElement: false;
            SVGFEFuncRElement: false;
            SVGFEGaussianBlurElement: false;
            SVGFEImageElement: false;
            SVGFEMergeElement: false;
            SVGFEMergeNodeElement: false;
            SVGFEMorphologyElement: false;
            SVGFEOffsetElement: false;
            SVGFEPointLightElement: false;
            SVGFESpecularLightingElement: false;
            SVGFESpotLightElement: false;
            SVGFETileElement: false;
            SVGFETurbulenceElement: false;
            SVGFilterElement: false;
            SVGForeignObjectElement: false;
            SVGGElement: false;
            SVGGeometryElement: false;
            SVGGradientElement: false;
            SVGGraphicsElement: false;
            SVGImageElement: false;
            SVGLength: false;
            SVGLengthList: false;
            SVGLinearGradientElement: false;
            SVGLineElement: false;
            SVGMarkerElement: false;
            SVGMaskElement: false;
            SVGMatrix: false;
            SVGMetadataElement: false;
            SVGMPathElement: false;
            SVGNumber: false;
            SVGNumberList: false;
            SVGPathElement: false;
            SVGPatternElement: false;
            SVGPoint: false;
            SVGPointList: false;
            SVGPolygonElement: false;
            SVGPolylineElement: false;
            SVGPreserveAspectRatio: false;
            SVGRadialGradientElement: false;
            SVGRect: false;
            SVGRectElement: false;
            SVGScriptElement: false;
            SVGSetElement: false;
            SVGStopElement: false;
            SVGStringList: false;
            SVGStyleElement: false;
            SVGSVGElement: false;
            SVGSwitchElement: false;
            SVGSymbolElement: false;
            SVGTextContentElement: false;
            SVGTextElement: false;
            SVGTextPathElement: false;
            SVGTextPositioningElement: false;
            SVGTitleElement: false;
            SVGTransform: false;
            SVGTransformList: false;
            SVGTSpanElement: false;
            SVGUnitTypes: false;
            SVGUseElement: false;
            SVGViewElement: false;
            SyncManager: false;
            TaskAttributionTiming: false;
            TaskController: false;
            TaskPriorityChangeEvent: false;
            TaskSignal: false;
            TEMPORARY: false;
            Text: false;
            TextDecoder: false;
            TextDecoderStream: false;
            TextEncoder: false;
            TextEncoderStream: false;
            TextEvent: false;
            TextFormat: false;
            TextFormatUpdateEvent: false;
            TextMetrics: false;
            TextTrack: false;
            TextTrackCue: false;
            TextTrackCueList: false;
            TextTrackList: false;
            TextUpdateEvent: false;
            TimeEvent: false;
            TimeRanges: false;
            ToggleEvent: false;
            toolbar: false;
            top: false;
            Touch: false;
            TouchEvent: false;
            TouchList: false;
            TrackEvent: false;
            TransformStream: false;
            TransformStreamDefaultController: false;
            TransitionEvent: false;
            TreeWalker: false;
            TrustedHTML: false;
            TrustedScript: false;
            TrustedScriptURL: false;
            TrustedTypePolicy: false;
            TrustedTypePolicyFactory: false;
            trustedTypes: false;
            UIEvent: false;
            URL: false;
            URLPattern: false;
            URLSearchParams: false;
            USB: false;
            USBAlternateInterface: false;
            USBConfiguration: false;
            USBConnectionEvent: false;
            USBDevice: false;
            USBEndpoint: false;
            USBInterface: false;
            USBInTransferResult: false;
            USBIsochronousInTransferPacket: false;
            USBIsochronousInTransferResult: false;
            USBIsochronousOutTransferPacket: false;
            USBIsochronousOutTransferResult: false;
            USBOutTransferResult: false;
            UserActivation: false;
            ValidityState: false;
            VideoColorSpace: false;
            VideoDecoder: false;
            VideoEncoder: false;
            VideoFrame: false;
            VideoPlaybackQuality: false;
            ViewTimeline: false;
            ViewTransition: false;
            ViewTransitionTypeSet: false;
            VirtualKeyboard: false;
            VirtualKeyboardGeometryChangeEvent: false;
            VisibilityStateEntry: false;
            visualViewport: false;
            VisualViewport: false;
            VTTCue: false;
            VTTRegion: false;
            WakeLock: false;
            WakeLockSentinel: false;
            WaveShaperNode: false;
            WebAssembly: false;
            WebGL2RenderingContext: false;
            WebGLActiveInfo: false;
            WebGLBuffer: false;
            WebGLContextEvent: false;
            WebGLFramebuffer: false;
            WebGLObject: false;
            WebGLProgram: false;
            WebGLQuery: false;
            WebGLRenderbuffer: false;
            WebGLRenderingContext: false;
            WebGLSampler: false;
            WebGLShader: false;
            WebGLShaderPrecisionFormat: false;
            WebGLSync: false;
            WebGLTexture: false;
            WebGLTransformFeedback: false;
            WebGLUniformLocation: false;
            WebGLVertexArrayObject: false;
            WebSocket: false;
            WebSocketError: false;
            WebSocketStream: false;
            WebTransport: false;
            WebTransportBidirectionalStream: false;
            WebTransportDatagramDuplexStream: false;
            WebTransportError: false;
            WebTransportReceiveStream: false;
            WebTransportSendStream: false;
            WGSLLanguageFeatures: false;
            WheelEvent: false;
            window: false;
            Window: false;
            WindowControlsOverlay: false;
            WindowControlsOverlayGeometryChangeEvent: false;
            Worker: false;
            Worklet: false;
            WorkletGlobalScope: false;
            WritableStream: false;
            WritableStreamDefaultController: false;
            WritableStreamDefaultWriter: false;
            XMLDocument: false;
            XMLHttpRequest: false;
            XMLHttpRequestEventTarget: false;
            XMLHttpRequestUpload: false;
            XMLSerializer: false;
            XPathEvaluator: false;
            XPathExpression: false;
            XPathResult: false;
            XRAnchor: false;
            XRAnchorSet: false;
            XRBoundedReferenceSpace: false;
            XRCamera: false;
            XRCPUDepthInformation: false;
            XRDepthInformation: false;
            XRDOMOverlayState: false;
            XRFrame: false;
            XRHand: false;
            XRHitTestResult: false;
            XRHitTestSource: false;
            XRInputSource: false;
            XRInputSourceArray: false;
            XRInputSourceEvent: false;
            XRInputSourcesChangeEvent: false;
            XRJointPose: false;
            XRJointSpace: false;
            XRLayer: false;
            XRLightEstimate: false;
            XRLightProbe: false;
            XRPose: false;
            XRRay: false;
            XRReferenceSpace: false;
            XRReferenceSpaceEvent: false;
            XRRenderState: false;
            XRRigidTransform: false;
            XRSession: false;
            XRSessionEvent: false;
            XRSpace: false;
            XRSystem: false;
            XRTransientInputHitTestResult: false;
            XRTransientInputHitTestSource: false;
            XRView: false;
            XRViewerPose: false;
            XRViewport: false;
            XRWebGLBinding: false;
            XRWebGLDepthInformation: false;
            XRWebGLLayer: false;
            XSLTProcessor: false;
            __dirname: false;
            __filename: false;
            Buffer: false;
            clearImmediate: false;
            exports: true;
            global: false;
            module: false;
            process: false;
            require: false;
            setImmediate: false;
        };
    };
    rules: {
        'no-console': string;
        'no-debugger': string;
        'no-alert': string;
        'perfectionist/sort-imports': (string | {
            internalPattern: string[];
        })[];
    };
} | {
    ignores: string[];
    files: string[];
})[];

export declare const default_alias_7: {
    '*': string[];
};

export declare const default_alias_8: (options: UserConfig) => UserConfig;

export declare const default_alias_9: (options: UserConfig) => UserConfig;

declare enum E_ErrorType {
    Error = "error",
    Warning = "warning"
}
export { E_ErrorType }
export { E_ErrorType as E_ErrorType_alias_1 }
export { E_ErrorType as E_ErrorType_alias_2 }

declare enum E_ErrorType_2 {
    Error = 'error',
    Warning = 'warning',
}

declare function executeCommand(command: string, parser?: typeof parseCommandOutput): Promise<void>;
export { executeCommand }
export { executeCommand as executeCommand_alias_1 }
export { executeCommand as executeCommand_alias_2 }

declare const fileExists: (filePath: string) => boolean;
export { fileExists }
export { fileExists as fileExists_alias_1 }
export { fileExists as fileExists_alias_2 }

declare function generateShortId(uuid: string, length?: number): string;
export { generateShortId }
export { generateShortId as generateShortId_alias_1 }
export { generateShortId as generateShortId_alias_2 }

declare function generateSlug(str?: string, options?: I_SlugifyOptions_2): string;
export { generateSlug }
export { generateSlug as generateSlug_alias_1 }
export { generateSlug as generateSlug_alias_2 }

declare function getLatestPackageVersion(packageName: string, forceRefresh?: boolean): Promise<string>;
export { getLatestPackageVersion }
export { getLatestPackageVersion as getLatestPackageVersion_alias_1 }
export { getLatestPackageVersion as getLatestPackageVersion_alias_2 }

declare function getMongoDateTime(now?: Date): string;
export { getMongoDateTime }
export { getMongoDateTime as getMongoDateTime_alias_1 }
export { getMongoDateTime as getMongoDateTime_alias_2 }

declare function getStoredErrorLists(): Promise<I_ErrorEntry_2[]>;
export { getStoredErrorLists }
export { getStoredErrorLists as getStoredErrorLists_alias_1 }
export { getStoredErrorLists as getStoredErrorLists_alias_2 }

declare interface I_ApolloOptions extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    uri?: string;
    wsUrl?: string;
    cache?: ApolloCache<unknown>;
}
export { I_ApolloOptions }
export { I_ApolloOptions as I_ApolloOptions_alias_1 }
export { I_ApolloOptions as I_ApolloOptions_alias_2 }

declare interface I_ApolloOptions_2 extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    uri?: string;
    wsUrl?: string;
    cache?: ApolloCache<unknown>;
}

declare interface I_ApolloProviderProps {
    children: T_Children;
    isNextJS?: boolean;
    options?: I_ApolloOptions;
    client?: ApolloClient<unknown>;
    makeClient?: () => ApolloClient<unknown>;
    provider?: ComponentType<I_ApolloProviderProps>;
    cache?: ApolloCache<unknown>;
}
export { I_ApolloProviderProps }
export { I_ApolloProviderProps as I_ApolloProviderProps_alias_1 }
export { I_ApolloProviderProps as I_ApolloProviderProps_alias_2 }

declare interface I_ApolloProviderProps_2 {
    children: T_Children_2;
    isNextJS?: boolean;
    options?: I_ApolloOptions_2;
    client?: ApolloClient<unknown>;
    makeClient?: () => ApolloClient<unknown>;
    provider?: ComponentType<I_ApolloProviderProps_2>;
    cache?: ApolloCache<unknown>;
}

declare interface I_BoxedLogOptions {
    color?: string;
    padding?: number;
    margin?: number;
    borderStyle?: 'round' | 'single' | 'double' | 'bold';
    titleColor?: string;
}
export { I_BoxedLogOptions }
export { I_BoxedLogOptions as I_BoxedLogOptions_alias_1 }
export { I_BoxedLogOptions as I_BoxedLogOptions_alias_2 }

declare interface I_BoxedLogOptions_2 {
    color?: string;
    padding?: number;
    margin?: number;
    borderStyle?: 'round' | 'single' | 'double' | 'bold';
    titleColor?: string;
}

declare interface I_Config {
    [key: string]: string | number | boolean | I_Config | I_Config[];
}
export { I_Config }
export { I_Config as I_Config_alias_1 }
export { I_Config as I_Config_alias_2 }

declare interface I_Config_2 {
    [key: string]: string | number | boolean | I_Config_2 | I_Config_2[];
}

declare interface I_CreateModelOptions<T extends Partial<C_Document>> extends I_MongooseOptions<T> {
    schema: T_Input_MongooseSchema<T>;
    name: string;
    aggregate?: boolean;
    middlewares?: I_MongooseModelMiddleware<T>[];
    pagination?: boolean;
}
export { I_CreateModelOptions }
export { I_CreateModelOptions as I_CreateModelOptions_alias_1 }
export { I_CreateModelOptions as I_CreateModelOptions_alias_2 }

declare interface I_CreateModelOptions_2<T extends Partial<C_Document_2>>
extends I_MongooseOptions_2<T> {
    schema: T_Input_MongooseSchema_2<T>;
    name: string;
    aggregate?: boolean;
    middlewares?: I_MongooseModelMiddleware_2<T>[];
    pagination?: boolean;
}

declare interface I_CreateSchemaOptions<T extends Partial<C_Document>> extends I_MongooseOptions<T> {
    schema: T_Input_MongooseSchema<T>;
    standalone?: boolean;
}
export { I_CreateSchemaOptions }
export { I_CreateSchemaOptions as I_CreateSchemaOptions_alias_1 }
export { I_CreateSchemaOptions as I_CreateSchemaOptions_alias_2 }

declare interface I_CreateSchemaOptions_2<T extends Partial<C_Document_2>>
extends I_MongooseOptions_2<T> {
    schema: T_Input_MongooseSchema_2<T>;
    standalone?: boolean;
}

declare interface I_DeleteOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}
export { I_DeleteOptionsExtended }
export { I_DeleteOptionsExtended as I_DeleteOptionsExtended_alias_1 }
export { I_DeleteOptionsExtended as I_DeleteOptionsExtended_alias_2 }

declare interface I_DeleteOptionsExtended_2 extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}

declare interface I_ErrorEntry {
    type: E_ErrorType;
    file: string;
    message: string;
    position?: string;
    rule?: string;
}
export { I_ErrorEntry }
export { I_ErrorEntry as I_ErrorEntry_alias_1 }
export { I_ErrorEntry as I_ErrorEntry_alias_2 }

declare interface I_ErrorEntry_2 {
    type: E_ErrorType_2;
    file: string;
    message: string;
    position?: string;
    rule?: string;
}

declare interface I_EslintError {
    filePath: string;
    messages: Array<{
        line: number;
        column: number;
        severity: number;
        message: string;
        ruleId: string;
    }>;
}
export { I_EslintError }
export { I_EslintError as I_EslintError_alias_1 }
export { I_EslintError as I_EslintError_alias_2 }

declare interface I_ExtendedModel<T extends Partial<C_Document>> extends Model<T>, PaginateModel<T>, AggregatePaginateModel<T> {
}
export { I_ExtendedModel }
export { I_ExtendedModel as I_ExtendedModel_alias_1 }
export { I_ExtendedModel as I_ExtendedModel_alias_2 }

declare interface I_ExtendedModel_2<T extends Partial<C_Document_2>>
extends Model<T>, PaginateModel<T>,
AggregatePaginateModel<T> { }

declare interface I_GenericDocument extends Partial<C_Document> {
    id: string;
    isDel: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}
export { I_GenericDocument }
export { I_GenericDocument as I_GenericDocument_alias_1 }
export { I_GenericDocument as I_GenericDocument_alias_2 }

declare interface I_GenericDocument_2 extends Partial<C_Document_2> {
    id: string;
    isDel: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

declare interface I_GraphqlCodegenConfig {
    uri: string;
    from: string;
    to: string;
    withComponent?: boolean;
    withHOC?: boolean;
    withHooks?: boolean;
    withMutationFn?: boolean;
    withRefetchFn?: boolean;
}
export { I_GraphqlCodegenConfig }
export { I_GraphqlCodegenConfig as I_GraphqlCodegenConfig_alias_1 }
export { I_GraphqlCodegenConfig as I_GraphqlCodegenConfig_alias_2 }

declare interface I_GraphqlCodegenConfig_2 {
    uri: string;
    from: string;
    to: string;
    withComponent?: boolean;
    withHOC?: boolean;
    withHooks?: boolean;
    withMutationFn?: boolean;
    withRefetchFn?: boolean;
}

declare interface I_Input_CreateMany<T> {
    docs: T[];
}
export { I_Input_CreateMany }
export { I_Input_CreateMany as I_Input_CreateMany_alias_1 }
export { I_Input_CreateMany as I_Input_CreateMany_alias_2 }

declare interface I_Input_CreateOne<T> {
    doc: T;
}
export { I_Input_CreateOne }
export { I_Input_CreateOne as I_Input_CreateOne_alias_1 }
export { I_Input_CreateOne as I_Input_CreateOne_alias_2 }

declare interface I_Input_DeleteMany<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}
export { I_Input_DeleteMany }
export { I_Input_DeleteMany as I_Input_DeleteMany_alias_1 }
export { I_Input_DeleteMany as I_Input_DeleteMany_alias_2 }

declare interface I_Input_DeleteOne<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}
export { I_Input_DeleteOne }
export { I_Input_DeleteOne as I_Input_DeleteOne_alias_1 }
export { I_Input_DeleteOne as I_Input_DeleteOne_alias_2 }

declare interface I_Input_FindAll<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}
export { I_Input_FindAll }
export { I_Input_FindAll as I_Input_FindAll_alias_1 }
export { I_Input_FindAll as I_Input_FindAll_alias_2 }

declare interface I_Input_FindOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}
export { I_Input_FindOne }
export { I_Input_FindOne as I_Input_FindOne_alias_1 }
export { I_Input_FindOne as I_Input_FindOne_alias_2 }

declare interface I_Input_FindPaging<T> {
    filter?: T_FilterQuery<T>;
    options?: T_PaginateOptionsWithPopulate;
}
export { I_Input_FindPaging }
export { I_Input_FindPaging as I_Input_FindPaging_alias_1 }
export { I_Input_FindPaging as I_Input_FindPaging_alias_2 }

declare interface I_Input_FindPagingAggregate {
    pipeline: T_PipelineStage[];
    options?: T_PaginateOptionsWithPopulate;
}
export { I_Input_FindPagingAggregate }
export { I_Input_FindPagingAggregate as I_Input_FindPagingAggregate_alias_1 }
export { I_Input_FindPagingAggregate as I_Input_FindPagingAggregate_alias_2 }

declare interface I_Input_UpdateMany<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}
export { I_Input_UpdateMany }
export { I_Input_UpdateMany as I_Input_UpdateMany_alias_1 }
export { I_Input_UpdateMany as I_Input_UpdateMany_alias_2 }

declare interface I_Input_UpdateOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}
export { I_Input_UpdateOne }
export { I_Input_UpdateOne as I_Input_UpdateOne_alias_1 }
export { I_Input_UpdateOne as I_Input_UpdateOne_alias_2 }

declare interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}
export { I_LoadingContext }
export { I_LoadingContext as I_LoadingContext_alias_1 }
export { I_LoadingContext as I_LoadingContext_alias_2 }

declare interface I_LoadingContext_2 {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}

declare interface I_LoadingProps {
    full?: boolean;
    block?: boolean;
    className?: string;
    message?: string;
}
export { I_LoadingProps }
export { I_LoadingProps as I_LoadingProps_alias_1 }
export { I_LoadingProps as I_LoadingProps_alias_2 }

declare interface I_LoadingProps_2 {
    full?: boolean;
    block?: boolean;
    className?: string;
    message?: string;
}

declare interface I_MongooseModelMiddleware<T extends Partial<C_Document>> {
    method: T_MongooseMiddlewareMethod;
    pre?: T_MongooseMiddlewarePreFunction<T & T_QueryWithHelpers<T>>;
    post?: T_MongooseMiddlewarePostFunction<T>;
}
export { I_MongooseModelMiddleware }
export { I_MongooseModelMiddleware as I_MongooseModelMiddleware_alias_1 }
export { I_MongooseModelMiddleware as I_MongooseModelMiddleware_alias_2 }

declare interface I_MongooseModelMiddleware_2<T extends Partial<C_Document_2>> {
    method: T_MongooseMiddlewareMethod_2;
    pre?: T_MongooseMiddlewarePreFunction_2<T & T_QueryWithHelpers_2<T>>;
    post?: T_MongooseMiddlewarePostFunction_2<T>;
}

declare interface I_MongooseOptions<T extends Partial<C_Document>> {
    mongoose: typeof mongoose;
    virtuals?: {
        name: keyof T | string;
        options?: I_VirtualOptions_2;
        get?: (this: T) => void;
    }[];
}
export { I_MongooseOptions }
export { I_MongooseOptions as I_MongooseOptions_alias_1 }
export { I_MongooseOptions as I_MongooseOptions_alias_2 }

declare interface I_MongooseOptions_2<T extends Partial<C_Document_2>> {
    mongoose: typeof mongoose;
    virtuals?: {
        name: keyof T | string;
        options?: I_VirtualOptions;
        get?: (this: T) => void;
    }[];
}

declare interface I_NextIntlContextType {
    languages: I_NextIntlLanguage[];
    currentLanguage: I_NextIntlLanguage;
    setCurrentLanguage: (newLang: I_NextIntlLanguage) => void;
}
export { I_NextIntlContextType }
export { I_NextIntlContextType as I_NextIntlContextType_alias_1 }
export { I_NextIntlContextType as I_NextIntlContextType_alias_2 }

declare interface I_NextIntlContextType_2 {
    languages: I_NextIntlLanguage_2[];
    currentLanguage: I_NextIntlLanguage_2;
    setCurrentLanguage: (newLang: I_NextIntlLanguage_2) => void;
}

declare interface I_NextIntlLanguage {
    label: string;
    value: string;
    flag: string;
    adapterLocale: Locale;
    icon: string;
    numberFormat: {
        code: string;
        currency: string;
    };
    timezone: Timezone;
}
export { I_NextIntlLanguage }
export { I_NextIntlLanguage as I_NextIntlLanguage_alias_1 }
export { I_NextIntlLanguage as I_NextIntlLanguage_alias_2 }

declare interface I_NextIntlLanguage_2 {
    label: string;
    value: string;
    flag: string;
    adapterLocale: Locale;
    icon: string;
    numberFormat: {
        code: string;
        currency: string;
    };
    timezone: Timezone;
}

declare type I_Return<T = void, E = unknown> = I_ReturnSuccess<T, E> | I_ReturnFailure;
export { I_Return }
export { I_Return as I_Return_alias_1 }
export { I_Return as I_Return_alias_2 }

declare type I_Return_2<T = void, E = unknown> = I_ReturnSuccess_2<T, E> | I_ReturnFailure_2;

declare interface I_ReturnFailure {
    success: false;
    message: string;
    code: number | string;
}
export { I_ReturnFailure }
export { I_ReturnFailure as I_ReturnFailure_alias_1 }
export { I_ReturnFailure as I_ReturnFailure_alias_2 }

declare interface I_ReturnFailure_2 {
    success: false;
    message: string;
    code: number | string;
}

declare interface I_ReturnSuccess<T, E = unknown> {
    success: true;
    result: T & E;
    message?: string;
    code?: number | string;
}
export { I_ReturnSuccess }
export { I_ReturnSuccess as I_ReturnSuccess_alias_1 }
export { I_ReturnSuccess as I_ReturnSuccess_alias_2 }

declare interface I_ReturnSuccess_2<T, E = unknown> {
    success: true;
    result: T & E;
    message?: string;
    code?: number | string;
}

declare interface I_Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}
export { I_Serializer }
export { I_Serializer as I_Serializer_alias_1 }
export { I_Serializer as I_Serializer_alias_2 }

declare interface I_Serializer_2<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}

declare interface I_SlugifyOptions {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
}
export { I_SlugifyOptions }
export { I_SlugifyOptions as I_SlugifyOptions_alias_1 }
export { I_SlugifyOptions as I_SlugifyOptions_alias_2 }

declare interface I_SlugifyOptions_2 {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
}

declare interface I_UpdateOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}
export { I_UpdateOptionsExtended }
export { I_UpdateOptionsExtended as I_UpdateOptionsExtended_alias_1 }
export { I_UpdateOptionsExtended as I_UpdateOptionsExtended_alias_2 }

declare interface I_UpdateOptionsExtended_2 extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}

declare interface I_VirtualNestedOptions {
    [key: string]: I_VirtualNestedOptions | number | string | boolean;
}

declare interface I_VirtualNestedOptions_2 {
    [key: string]: I_VirtualNestedOptions_2 | number | string | boolean;
}

declare interface I_VirtualOptions {
    ref: string;
    localField: string;
    foreignField: string;
    count?: boolean;
    justOne?: boolean;
    options?: I_VirtualNestedOptions;
}

declare interface I_VirtualOptions_2 {
    ref: string;
    localField: string;
    foreignField: string;
    count?: boolean;
    justOne?: boolean;
    options?: I_VirtualNestedOptions_2;
}

declare function initI18Next(options: InitOptions): Promise<TFunction<"translation", undefined>>;
export { initI18Next }
export { initI18Next as initI18Next_alias_1 }

declare function initNodePersist(): Promise<void>;
export { initNodePersist }
export { initNodePersist as initNodePersist_alias_1 }
export { initNodePersist as initNodePersist_alias_2 }

declare function isCurrentProject(WORKING_DIRECTORY: string, PACKAGE_NAME: string): boolean;
export { isCurrentProject }
export { isCurrentProject as isCurrentProject_alias_1 }
export { isCurrentProject as isCurrentProject_alias_2 }

declare function isJson(str: string): boolean;
export { isJson }
export { isJson as isJson_alias_1 }
export { isJson as isJson_alias_2 }

declare function isPackageOutdated(packageName: string, forceRefresh?: boolean): Promise<boolean>;
export { isPackageOutdated }
export { isPackageOutdated as isPackageOutdated_alias_1 }
export { isPackageOutdated as isPackageOutdated_alias_2 }

declare function Loading({ full, block, className, message, ...rest }: I_LoadingProps_2): JSX_2.Element;
export { Loading }
export { Loading as Loading_alias_1 }
export { Loading as Loading_alias_2 }

declare const LoadingContext: Context<I_LoadingContext_2 | undefined>;
export { LoadingContext }
export { LoadingContext as LoadingContext_alias_1 }
export { LoadingContext as LoadingContext_alias_2 }

declare function LoadingProvider({ children }: {
    children: T_Children_2;
}): JSX_2.Element;
export { LoadingProvider }
export { LoadingProvider as LoadingProvider_alias_1 }
export { LoadingProvider as LoadingProvider_alias_2 }

declare class MongoController<D extends Partial<C_Document_2>> {
    private collection;
    constructor(db: C_Db_2, collectionName: string);
    createOne(document: D): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertOneResult_2<D>;
    }>;
    createMany(documents: D[]): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertManyResult_2<D>;
    }>;
    findOne(filter: T_Filter_2<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_WithId_2<D> | null;
    }>;
    findAll(filter?: T_Filter_2<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_WithId_2<D>[];
    }>;
    count(filter?: T_Filter_2<D>): Promise<{
        success: boolean;
        message: string;
        result?: number;
    }>;
    updateOne(filter: T_Filter_2<D>, update: Partial<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_UpdateResult_2;
    }>;
    updateMany(filter: T_Filter_2<D>, update: Partial<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_UpdateResult_2;
    }>;
    deleteOne(filter: T_Filter_2<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_DeleteResult_2;
    }>;
    deleteMany(filter: T_Filter_2<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_DeleteResult_2;
    }>;
}
export { MongoController }
export { MongoController as MongoController_alias_1 }
export { MongoController as MongoController_alias_2 }

declare class MongooseController<T extends Partial<C_Document_2>> {
    private model;
    constructor(model: I_ExtendedModel_2<T>);
    private getModelName;
    findOne(filter?: T_FilterQuery_2<T>, projection?: T_ProjectionType_2<T>, options?: T_QueryOptions_2<T>, populate?: T_Input_Populate_2): Promise<I_Return_2<T>>;
    findAll(filter?: T_FilterQuery_2<T>, projection?: T_ProjectionType_2<T>, options?: T_QueryOptions_2<T>, populate?: T_Input_Populate_2): Promise<I_Return_2<T[]>>;
    findPaging(filter?: T_FilterQuery_2<T>, options?: T_PaginateOptionsWithPopulate_2): Promise<I_Return_2<T_PaginateResult_2<T>>>;
    findPagingAggregate(pipeline: T_PipelineStage_2[], options?: T_PaginateOptionsWithPopulate_2): Promise<I_Return_2<T_AggregatePaginateResult_2<T>>>;
    count(filter?: T_FilterQuery_2<T>): Promise<I_Return_2<number>>;
    createOne(doc: T | Partial<T>): Promise<I_Return_2<T>>;
    createMany(docs: (T | Partial<T>)[], options?: T_InsertManyOptions_2): Promise<I_Return_2<T[]>>;
    updateOne(filter?: T_FilterQuery_2<T>, update?: T_UpdateQuery_2<T>, options?: I_UpdateOptionsExtended_2): Promise<I_Return_2<T>>;
    updateMany(filter?: T_FilterQuery_2<T>, update?: T_UpdateQuery_2<T>, options?: I_UpdateOptionsExtended_2): Promise<I_Return_2<T_UpdateResult_2>>;
    deleteOne(filter?: T_FilterQuery_2<T>, options?: I_DeleteOptionsExtended_2): Promise<I_Return_2<T>>;
    deleteMany(filter?: T_FilterQuery_2<T>, options?: I_DeleteOptionsExtended_2): Promise<I_Return_2<T_DeleteResult_2>>;
    createShortId(id: string, length?: number): Promise<I_Return_2<string>>;
    createSlug(fieldName: string, fields: T, filters?: T_FilterQuery_2<T>): Promise<I_Return_2<string | {
        [key: string]: string;
    }>>;
    aggregate(pipeline: T_PipelineStage_2[]): Promise<I_Return_2<T[]>>;
}
export { MongooseController }
export { MongooseController as MongooseController_alias_1 }
export { MongooseController as MongooseController_alias_2 }

export { mongoosePaginate }
export { mongoosePaginate as mongoosePaginate_alias_1 }
export { mongoosePaginate as mongoosePaginate_alias_2 }

declare const NextIntlContext: Context<I_NextIntlContextType_2 | undefined>;
export { NextIntlContext }
export { NextIntlContext as NextIntlContext_alias_1 }
export { NextIntlContext as NextIntlContext_alias_2 }

declare function NextIntlProvider({ children, languages, messages, }: {
    children: T_Children_2;
    languages: I_NextIntlLanguage_2[];
    messages: T_NextIntlMessageList_2;
}): JSX_2.Element;
export { NextIntlProvider }
export { NextIntlProvider as NextIntlProvider_alias_1 }
export { NextIntlProvider as NextIntlProvider_alias_2 }

declare function parseCommandOutput(output: string): void;

declare function printBoxedLog<T extends string | I_ErrorEntry_2[]>(title: string, content: T, { color, padding, margin, borderStyle, titleColor, }?: I_BoxedLogOptions_2): void;

declare const PROJECT_ROOT: string;
export { PROJECT_ROOT }
export { PROJECT_ROOT as PROJECT_ROOT_alias_1 }
export { PROJECT_ROOT as PROJECT_ROOT_alias_2 }

declare function regexSearchMapper(str: string): string;
export { regexSearchMapper }
export { regexSearchMapper as regexSearchMapper_alias_1 }
export { regexSearchMapper as regexSearchMapper_alias_2 }

declare function removeAccent(str: string): string;
export { removeAccent }
export { removeAccent as removeAccent_alias_1 }
export { removeAccent as removeAccent_alias_2 }

declare const RESPONSE_STATUS: {
    GRAPHQL_PARSE_FAILED: {
        CODE: string;
        MESSAGE: string;
    };
    GRAPHQL_VALIDATION_FAILED: {
        CODE: string;
        MESSAGE: string;
    };
    BAD_USER_INPUT: {
        CODE: string;
        MESSAGE: string;
    };
    PERSISTED_QUERY_NOT_FOUND: {
        CODE: string;
        MESSAGE: string;
    };
    PERSISTED_QUERY_NOT_SUPPORTED: {
        CODE: string;
        MESSAGE: string;
    };
    OPERATION_RESOLUTION_FAILURE: {
        CODE: string;
        MESSAGE: string;
    };
    CONTINUE: {
        CODE: number;
        MESSAGE: string;
    };
    SWITCHING_PROTOCOLS: {
        CODE: number;
        MESSAGE: string;
    };
    PROCESSING: {
        CODE: number;
        MESSAGE: string;
    };
    OK: {
        CODE: number;
        MESSAGE: string;
    };
    CREATED: {
        CODE: number;
        MESSAGE: string;
    };
    ACCEPTED: {
        CODE: number;
        MESSAGE: string;
    };
    NON_AUTHORITATIVE_INFORMATION: {
        CODE: number;
        MESSAGE: string;
    };
    NO_CONTENT: {
        CODE: number;
        MESSAGE: string;
    };
    RESET_CONTENT: {
        CODE: number;
        MESSAGE: string;
    };
    PARTIAL_CONTENT: {
        CODE: number;
        MESSAGE: string;
    };
    MULTI_STATUS: {
        CODE: number;
        MESSAGE: string;
    };
    MULTIPLE_CHOICES: {
        CODE: number;
        MESSAGE: string;
    };
    MOVED_PERMANENTLY: {
        CODE: number;
        MESSAGE: string;
    };
    MOVED_TEMPORARILY: {
        CODE: number;
        MESSAGE: string;
    };
    SEE_OTHER: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_MODIFIED: {
        CODE: number;
        MESSAGE: string;
    };
    USE_PROXY: {
        CODE: number;
        MESSAGE: string;
    };
    TEMPORARY_REDIRECT: {
        CODE: number;
        MESSAGE: string;
    };
    PERMANENT_REDIRECT: {
        CODE: number;
        MESSAGE: string;
    };
    BAD_REQUEST: {
        CODE: number;
        MESSAGE: string;
    };
    UNAUTHORIZED: {
        CODE: number;
        MESSAGE: string;
    };
    PAYMENT_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    FORBIDDEN: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_FOUND: {
        CODE: number;
        MESSAGE: string;
    };
    METHOD_NOT_ALLOWED: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_ACCEPTABLE: {
        CODE: number;
        MESSAGE: string;
    };
    PROXY_AUTHENTICATION_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_TIMEOUT: {
        CODE: number;
        MESSAGE: string;
    };
    CONFLICT: {
        CODE: number;
        MESSAGE: string;
    };
    GONE: {
        CODE: number;
        MESSAGE: string;
    };
    LENGTH_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    PRECONDITION_FAILED: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_TOO_LONG: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_URI_TOO_LONG: {
        CODE: number;
        MESSAGE: string;
    };
    UNSUPPORTED_MEDIA_TYPE: {
        CODE: number;
        MESSAGE: string;
    };
    REQUESTED_RANGE_NOT_SATISFIABLE: {
        CODE: number;
        MESSAGE: string;
    };
    EXPECTATION_FAILED: {
        CODE: number;
        MESSAGE: string;
    };
    IM_A_TEAPOT: {
        CODE: number;
        MESSAGE: string;
    };
    INSUFFICIENT_SPACE_ON_RESOURCE: {
        CODE: number;
        MESSAGE: string;
    };
    METHOD_FAILURE: {
        CODE: number;
        MESSAGE: string;
    };
    MISDIRECTED_REQUEST: {
        CODE: number;
        MESSAGE: string;
    };
    UNPROCESSABLE_ENTITY: {
        CODE: number;
        MESSAGE: string;
    };
    LOCKED: {
        CODE: number;
        MESSAGE: string;
    };
    FAILED_DEPENDENCY: {
        CODE: number;
        MESSAGE: string;
    };
    PRECONDITION_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    TOO_MANY_REQUESTS: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
        CODE: number;
        MESSAGE: string;
    };
    UNAVAILABLE_FOR_LEGAL_REASONS: {
        CODE: number;
        MESSAGE: string;
    };
    INTERNAL_SERVER_ERROR: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_IMPLEMENTED: {
        CODE: number;
        MESSAGE: string;
    };
    BAD_GATEWAY: {
        CODE: number;
        MESSAGE: string;
    };
    SERVICE_UNAVAILABLE: {
        CODE: number;
        MESSAGE: string;
    };
    GATEWAY_TIMEOUT: {
        CODE: number;
        MESSAGE: string;
    };
    HTTP_VERSION_NOT_SUPPORTED: {
        CODE: number;
        MESSAGE: string;
    };
    INSUFFICIENT_STORAGE: {
        CODE: number;
        MESSAGE: string;
    };
    NETWORK_AUTHENTICATION_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
};
export { RESPONSE_STATUS }
export { RESPONSE_STATUS as RESPONSE_STATUS_alias_1 }
export { RESPONSE_STATUS as RESPONSE_STATUS_alias_2 }

declare function saveErrorListToStorage(errorList: I_ErrorEntry_2[]): Promise<void>;
export { saveErrorListToStorage }
export { saveErrorListToStorage as saveErrorListToStorage_alias_1 }
export { saveErrorListToStorage as saveErrorListToStorage_alias_2 }

declare const serializer: I_Serializer_2<unknown>;
export { serializer }
export { serializer as serializer_alias_1 }
export { serializer as serializer_alias_2 }

declare const storageClient: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
};
export { storageClient }
export { storageClient as storageClient_alias_1 }
export { storageClient as storageClient_alias_2 }

declare const storageDir: string;
export { storageDir }
export { storageDir as storageDir_alias_1 }
export { storageDir as storageDir_alias_2 }

declare const storageServer: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
    getLogLink(key: string): Promise<string | null>;
};
export { storageServer }
export { storageServer as storageServer_alias_1 }
export { storageServer as storageServer_alias_2 }

declare type T_AggregatePaginateResult<T> = AggregatePaginateResult<T>;
export { T_AggregatePaginateResult }
export { T_AggregatePaginateResult as T_AggregatePaginateResult_alias_1 }
export { T_AggregatePaginateResult as T_AggregatePaginateResult_alias_2 }

declare type T_AggregatePaginateResult_2<T> = AggregatePaginateResult<T>;

declare type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;
export { T_Children }
export { T_Children as T_Children_alias_1 }
export { T_Children as T_Children_alias_2 }

declare type T_Children_2 = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;

declare type T_CreateSlugQueryResponse<T> = T_FilterQuery<T> & {
    $or: Array<{
        slug: string;
    } | {
        slugHistory: string;
    }>;
} & {
    id?: {
        $ne: string;
    };
};
export { T_CreateSlugQueryResponse }
export { T_CreateSlugQueryResponse as T_CreateSlugQueryResponse_alias_1 }
export { T_CreateSlugQueryResponse as T_CreateSlugQueryResponse_alias_2 }

declare type T_CreateSlugQueryResponse_2<T> = T_FilterQuery_2<T> & {
    $or: Array<{ slug: string } | { slugHistory: string }>;
} & { id?: { $ne: string } };

declare type T_DeleteResult = DeleteResult;
export { T_DeleteResult }
export { T_DeleteResult as T_DeleteResult_alias_1 }
export { T_DeleteResult as T_DeleteResult_alias_2 }

declare type T_DeleteResult_2 = DeleteResult;

declare type T_ErrorHandlingMiddlewareFunction<T> = ErrorHandlingMiddlewareFunction<T>;
export { T_ErrorHandlingMiddlewareFunction }
export { T_ErrorHandlingMiddlewareFunction as T_ErrorHandlingMiddlewareFunction_alias_1 }
export { T_ErrorHandlingMiddlewareFunction as T_ErrorHandlingMiddlewareFunction_alias_2 }

declare type T_ErrorHandlingMiddlewareFunction_2<T> = ErrorHandlingMiddlewareFunction<T>;

declare type T_ErrorHandlingMiddlewareWithOption<T> = ErrorHandlingMiddlewareWithOption<T>;
export { T_ErrorHandlingMiddlewareWithOption }
export { T_ErrorHandlingMiddlewareWithOption as T_ErrorHandlingMiddlewareWithOption_alias_1 }
export { T_ErrorHandlingMiddlewareWithOption as T_ErrorHandlingMiddlewareWithOption_alias_2 }

declare type T_ErrorHandlingMiddlewareWithOption_2<T> = ErrorHandlingMiddlewareWithOption<T>;

declare type T_Filter<T> = Filter<T>;
export { T_Filter }
export { T_Filter as T_Filter_alias_1 }
export { T_Filter as T_Filter_alias_2 }

declare type T_Filter_2<T> = Filter<T>;

declare type T_FilterQuery<T> = FilterQuery<T>;
export { T_FilterQuery }
export { T_FilterQuery as T_FilterQuery_alias_1 }
export { T_FilterQuery as T_FilterQuery_alias_2 }

declare type T_FilterQuery_2<T> = FilterQuery<T>;

declare type T_Input_MongooseSchema<T> = SchemaDefinition<T>;
export { T_Input_MongooseSchema }
export { T_Input_MongooseSchema as T_Input_MongooseSchema_alias_1 }
export { T_Input_MongooseSchema as T_Input_MongooseSchema_alias_2 }

declare type T_Input_MongooseSchema_2<T> = SchemaDefinition<T>;

declare type T_Input_Populate = string | string[] | T_PopulateOptions | T_PopulateOptions[];
export { T_Input_Populate }
export { T_Input_Populate as T_Input_Populate_alias_1 }
export { T_Input_Populate as T_Input_Populate_alias_2 }

declare type T_Input_Populate_2 = string | string[] | T_PopulateOptions_2 | T_PopulateOptions_2[];

declare type T_InsertManyOptions = InsertManyOptions;
export { T_InsertManyOptions }
export { T_InsertManyOptions as T_InsertManyOptions_alias_1 }
export { T_InsertManyOptions as T_InsertManyOptions_alias_2 }

declare type T_InsertManyOptions_2 = InsertManyOptions;

declare type T_InsertManyResult<T> = InsertManyResult<T>;
export { T_InsertManyResult }
export { T_InsertManyResult as T_InsertManyResult_alias_1 }
export { T_InsertManyResult as T_InsertManyResult_alias_2 }

declare type T_InsertManyResult_2<T> = InsertManyResult<T>;

declare type T_InsertOneResult<T> = InsertOneResult<T>;
export { T_InsertOneResult }
export { T_InsertOneResult as T_InsertOneResult_alias_1 }
export { T_InsertOneResult as T_InsertOneResult_alias_2 }

declare type T_InsertOneResult_2<T> = InsertOneResult<T>;

declare type T_MongooseHookNextFunction = (error?: Error) => void;
export { T_MongooseHookNextFunction }
export { T_MongooseHookNextFunction as T_MongooseHookNextFunction_alias_1 }
export { T_MongooseHookNextFunction as T_MongooseHookNextFunction_alias_2 }

declare type T_MongooseMiddlewareMethod = string | RegExp;
export { T_MongooseMiddlewareMethod }
export { T_MongooseMiddlewareMethod as T_MongooseMiddlewareMethod_alias_1 }
export { T_MongooseMiddlewareMethod as T_MongooseMiddlewareMethod_alias_2 }

declare type T_MongooseMiddlewareMethod_2 = string | RegExp;

declare type T_MongooseMiddlewarePostFunction<T> = T_PostMiddlewareFunction<T> & T_ErrorHandlingMiddlewareFunction<T> & T_ErrorHandlingMiddlewareWithOption<T>;
export { T_MongooseMiddlewarePostFunction }
export { T_MongooseMiddlewarePostFunction as T_MongooseMiddlewarePostFunction_alias_1 }
export { T_MongooseMiddlewarePostFunction as T_MongooseMiddlewarePostFunction_alias_2 }

declare type T_MongooseMiddlewarePostFunction_2<T> = T_PostMiddlewareFunction_2<T> & T_ErrorHandlingMiddlewareFunction_2<T> & T_ErrorHandlingMiddlewareWithOption_2<T>;

declare type T_MongooseMiddlewarePreFunction<T> = T_PreMiddlewareFunction<T> & T_PreSaveMiddlewareFunction<T>;
export { T_MongooseMiddlewarePreFunction }
export { T_MongooseMiddlewarePreFunction as T_MongooseMiddlewarePreFunction_alias_1 }
export { T_MongooseMiddlewarePreFunction as T_MongooseMiddlewarePreFunction_alias_2 }

declare type T_MongooseMiddlewarePreFunction_2<T> = T_PreMiddlewareFunction_2<T> & T_PreSaveMiddlewareFunction_2<T>;

declare type T_MongoosePlugin = (schema: Schema, options?: Record<string, unknown>) => void;
export { T_MongoosePlugin }
export { T_MongoosePlugin as T_MongoosePlugin_alias_1 }
export { T_MongoosePlugin as T_MongoosePlugin_alias_2 }

declare type T_MongooseShema<T> = mongoose.Schema<T>;
export { T_MongooseShema }
export { T_MongooseShema as T_MongooseShema_alias_1 }
export { T_MongooseShema as T_MongooseShema_alias_2 }

declare type T_MongooseShema_2<T> = mongoose.Schema<T>;

declare type T_NextIntlMessageList = Record<string, AbstractIntlMessages>;
export { T_NextIntlMessageList }
export { T_NextIntlMessageList as T_NextIntlMessageList_alias_1 }
export { T_NextIntlMessageList as T_NextIntlMessageList_alias_2 }

declare type T_NextIntlMessageList_2 = Record<string, AbstractIntlMessages>;

declare type T_OptionalUnlessRequiredId<T> = OptionalUnlessRequiredId<T>;
export { T_OptionalUnlessRequiredId }
export { T_OptionalUnlessRequiredId as T_OptionalUnlessRequiredId_alias_1 }
export { T_OptionalUnlessRequiredId as T_OptionalUnlessRequiredId_alias_2 }

declare type T_PaginateOptions = PaginateOptions;
export { T_PaginateOptions }
export { T_PaginateOptions as T_PaginateOptions_alias_1 }
export { T_PaginateOptions as T_PaginateOptions_alias_2 }

declare type T_PaginateOptions_2 = PaginateOptions;

declare interface T_PaginateOptionsWithPopulate extends T_PaginateOptions, T_PopulateOption {
}
export { T_PaginateOptionsWithPopulate }
export { T_PaginateOptionsWithPopulate as T_PaginateOptionsWithPopulate_alias_1 }
export { T_PaginateOptionsWithPopulate as T_PaginateOptionsWithPopulate_alias_2 }

declare interface T_PaginateOptionsWithPopulate_2
extends T_PaginateOptions_2,
T_PopulateOption_2 { }

declare type T_PaginateResult<T> = PaginateResult<T>;
export { T_PaginateResult }
export { T_PaginateResult as T_PaginateResult_alias_1 }
export { T_PaginateResult as T_PaginateResult_alias_2 }

declare type T_PaginateResult_2<T> = PaginateResult<T>;

declare type T_PipelineStage = PipelineStage;
export { T_PipelineStage }
export { T_PipelineStage as T_PipelineStage_alias_1 }
export { T_PipelineStage as T_PipelineStage_alias_2 }

declare type T_PipelineStage_2 = PipelineStage;

declare type T_PopulateOption = PopulateOption;
export { T_PopulateOption }
export { T_PopulateOption as T_PopulateOption_alias_1 }
export { T_PopulateOption as T_PopulateOption_alias_2 }

declare type T_PopulateOption_2 = PopulateOption;

declare type T_PopulateOptions = PopulateOptions;
export { T_PopulateOptions }
export { T_PopulateOptions as T_PopulateOptions_alias_1 }
export { T_PopulateOptions as T_PopulateOptions_alias_2 }

declare type T_PopulateOptions_2 = PopulateOptions;

declare type T_PostMiddlewareFunction<T> = PostMiddlewareFunction<T>;
export { T_PostMiddlewareFunction }
export { T_PostMiddlewareFunction as T_PostMiddlewareFunction_alias_1 }
export { T_PostMiddlewareFunction as T_PostMiddlewareFunction_alias_2 }

declare type T_PostMiddlewareFunction_2<T> = PostMiddlewareFunction<T>;

declare type T_PreMiddlewareFunction<T> = PreMiddlewareFunction<T>;
export { T_PreMiddlewareFunction }
export { T_PreMiddlewareFunction as T_PreMiddlewareFunction_alias_1 }
export { T_PreMiddlewareFunction as T_PreMiddlewareFunction_alias_2 }

declare type T_PreMiddlewareFunction_2<T> = PreMiddlewareFunction<T>;

declare type T_PreSaveMiddlewareFunction<T> = PreSaveMiddlewareFunction<T>;
export { T_PreSaveMiddlewareFunction }
export { T_PreSaveMiddlewareFunction as T_PreSaveMiddlewareFunction_alias_1 }
export { T_PreSaveMiddlewareFunction as T_PreSaveMiddlewareFunction_alias_2 }

declare type T_PreSaveMiddlewareFunction_2<T> = PreSaveMiddlewareFunction<T>;

declare type T_ProjectionType<T> = ProjectionType<T>;
export { T_ProjectionType }
export { T_ProjectionType as T_ProjectionType_alias_1 }
export { T_ProjectionType as T_ProjectionType_alias_2 }

declare type T_ProjectionType_2<T> = ProjectionType<T>;

declare type T_QueryOptions<T> = QueryOptions<T>;
export { T_QueryOptions }
export { T_QueryOptions as T_QueryOptions_alias_1 }
export { T_QueryOptions as T_QueryOptions_alias_2 }

declare type T_QueryOptions_2<T> = QueryOptions<T>;

declare type T_QueryWithHelpers<T> = QueryWithHelpers<T, T>;
export { T_QueryWithHelpers }
export { T_QueryWithHelpers as T_QueryWithHelpers_alias_1 }
export { T_QueryWithHelpers as T_QueryWithHelpers_alias_2 }

declare type T_QueryWithHelpers_2<T> = QueryWithHelpers<T, T>;

declare interface T_ThrowResponseArgs {
    message?: string;
    status?: {
        CODE: string | number;
        MESSAGE: string;
    };
    type?: 'graphql' | 'rest';
}
export { T_ThrowResponseArgs }
export { T_ThrowResponseArgs as T_ThrowResponseArgs_alias_1 }
export { T_ThrowResponseArgs as T_ThrowResponseArgs_alias_2 }

declare interface T_ThrowResponseArgs_2 {
    message?: string;
    status?: {
        CODE: string | number;
        MESSAGE: string;
    };
    type?: 'graphql' | 'rest';
}

declare type T_UpdateQuery<T> = UpdateQuery<T>;
export { T_UpdateQuery }
export { T_UpdateQuery as T_UpdateQuery_alias_1 }
export { T_UpdateQuery as T_UpdateQuery_alias_2 }

declare type T_UpdateQuery_2<T> = UpdateQuery<T>;

declare type T_UpdateResult = UpdateResult;
export { T_UpdateResult }
export { T_UpdateResult as T_UpdateResult_alias_1 }
export { T_UpdateResult as T_UpdateResult_alias_2 }

declare type T_UpdateResult_2 = UpdateResult;

declare type T_WithId<T> = WithId<T>;
export { T_WithId }
export { T_WithId as T_WithId_alias_1 }
export { T_WithId as T_WithId_alias_2 }

declare type T_WithId_2<T> = WithId<T>;

declare function throwResponse({ message, status, type, }: T_ThrowResponseArgs_2): never;
export { throwResponse }
export { throwResponse as throwResponse_alias_1 }
export { throwResponse as throwResponse_alias_2 }

declare function updatePackage(packageName: string): Promise<void>;
export { updatePackage }
export { updatePackage as updatePackage_alias_1 }
export { updatePackage as updatePackage_alias_2 }

declare function useLoading(): I_LoadingContext_2;
export { useLoading }
export { useLoading as useLoading_alias_1 }
export { useLoading as useLoading_alias_2 }

declare function useNextIntl(): I_NextIntlContextType_2;
export { useNextIntl }
export { useNextIntl as useNextIntl_alias_1 }
export { useNextIntl as useNextIntl_alias_2 }

declare function useStorage<T>(key: string, initialValue: T, serializer?: I_Serializer_2<T>): readonly [T, (value: T | ((val: T) => T)) => void];
export { useStorage }
export { useStorage as useStorage_alias_1 }
export { useStorage as useStorage_alias_2 }

declare const useTranslateNextIntl: useTranslations;
export { useTranslateNextIntl }
export { useTranslateNextIntl as useTranslateNextIntl_alias_1 }
export { useTranslateNextIntl as useTranslateNextIntl_alias_2 }

declare const validate: {
    common: {
        isEmpty(value: unknown): boolean;
        isEmptyValidator<T>(): (this: T, value: unknown) => Promise<boolean>;
        isUniqueValidator<T extends {
            constructor: {
                findOne: (query: Record<string, unknown>) => Promise<unknown>;
            };
        }>(fields: string[]): (this: T, value: unknown) => Promise<boolean>;
        matchesRegexValidator(regexArray: RegExp[]): (value: string) => Promise<boolean>;
    };
};
export { validate }
export { validate as validate_alias_1 }
export { validate as validate_alias_2 }

declare function withNextIntl<T extends {
    children: T_Children_2;
}>(Component: ComponentType<T>): {
    (props: T & {
        languages: I_NextIntlLanguage_2[];
        messages: T_NextIntlMessageList_2;
    }): JSX_2.Element | null;
    displayName: string;
};
export { withNextIntl }
export { withNextIntl as withNextIntl_alias_1 }
export { withNextIntl as withNextIntl_alias_2 }

declare const WORKING_DIRECTORY: string;
export { WORKING_DIRECTORY }
export { WORKING_DIRECTORY as WORKING_DIRECTORY_alias_1 }
export { WORKING_DIRECTORY as WORKING_DIRECTORY_alias_2 }

export { }
