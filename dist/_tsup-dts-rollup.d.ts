import type { AbstractIntlMessages } from 'next-intl';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import type { AggregatePaginateModel } from 'mongoose';
import type { AggregatePaginateResult } from 'mongoose';
import { ApolloCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { ApolloClientOptions } from '@apollo/client';
import type { ApolloError as ApolloError_2 } from '@apollo/client';
import type { ApolloLink } from '@apollo/client';
import type { ClientSession } from 'mongoose';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { Collection } from 'mongodb';
import type { ComponentType } from 'react';
import type consola from 'consola';
import { Context } from 'react';
import { Db } from 'mongodb';
import type { DeleteResult } from 'mongodb';
import { Document as Document_2 } from 'mongoose';
import type { ErrorHandlingMiddlewareFunction } from 'mongoose';
import type { ErrorHandlingMiddlewareWithOption } from 'mongoose';
import type { Filter } from 'mongodb';
import type { FilterQuery } from 'mongoose';
import { I_ApolloErrorContext as I_ApolloErrorContext_2 } from './apollo-error.type.js';
import { I_Command as I_Command_2 } from './command.type.js';
import { I_LoadingContext as I_LoadingContext_2 } from './loading.type.js';
import type { InitOptions } from 'i18next';
import type { InsertManyOptions } from 'mongoose';
import type { InsertManyResult } from 'mongodb';
import type { InsertOneResult } from 'mongodb';
import type { JSX } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { Locale } from 'date-fns/locale';
import type { Locale as Locale_2 } from 'date-fns';
import { Model } from 'mongoose';
import type mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import type mongooseRaw from 'mongoose';
import type { NormalizedCacheObject } from '@apollo/client';
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
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import type { UpdateQuery } from 'mongoose';
import type { UpdateResult } from 'mongodb';
import type { UriFunction } from '@apollo/client';
import type { UserConfig } from 'vite';
import { useTranslation } from 'react-i18next';
import { useTranslations } from 'next-intl';
import type { WithId } from 'mongodb';

export { aggregatePaginate }
export { aggregatePaginate as aggregatePaginate_alias_1 }
export { aggregatePaginate as aggregatePaginate_alias_2 }
export { aggregatePaginate as aggregatePaginate_alias_3 }

export { ApolloCache }
export { ApolloCache as ApolloCache_alias_1 }
export { ApolloCache as ApolloCache_alias_2 }
export { ApolloCache as ApolloCache_alias_3 }

export { ApolloClient }
export { ApolloClient as ApolloClient_alias_1 }
export { ApolloClient as ApolloClient_alias_2 }
export { ApolloClient as ApolloClient_alias_3 }

export { ApolloClientOptions }
export { ApolloClientOptions as ApolloClientOptions_alias_1 }
export { ApolloClientOptions as ApolloClientOptions_alias_2 }
export { ApolloClientOptions as ApolloClientOptions_alias_3 }

declare function ApolloError(): JSX_2.Element | null;
export { ApolloError }
export { ApolloError as ApolloError_alias_1 }
export { ApolloError as ApolloError_alias_2 }
export { ApolloError as ApolloError_alias_3 }

declare const ApolloErrorContext: Context<I_ApolloErrorContext | undefined>;
export { ApolloErrorContext }
export { ApolloErrorContext as ApolloErrorContext_alias_1 }
export { ApolloErrorContext as ApolloErrorContext_alias_2 }
export { ApolloErrorContext as ApolloErrorContext_alias_3 }

declare function ApolloErrorProvider({ children }: {
    children: ReactNode;
}): JSX_2.Element;
export { ApolloErrorProvider }
export { ApolloErrorProvider as ApolloErrorProvider_alias_1 }
export { ApolloErrorProvider as ApolloErrorProvider_alias_2 }
export { ApolloErrorProvider as ApolloErrorProvider_alias_3 }

declare function ApolloProvider({ isNextJS, options, children, client: CustomClient, provider: CustomProvider, cache: CustomCache, }: I_ApolloProviderProps): JSX_2.Element;
export { ApolloProvider }
export { ApolloProvider as ApolloProvider_alias_1 }
export { ApolloProvider as ApolloProvider_alias_2 }
export { ApolloProvider as ApolloProvider_alias_3 }

declare function appendFileSync(filePath: string, data: string | T_Object_2, options?: {
    isJson?: boolean;
}): void;
export { appendFileSync }
export { appendFileSync as appendFileSync_alias_1 }
export { appendFileSync as appendFileSync_alias_2 }
export { appendFileSync as appendFileSync_alias_3 }

declare const BUILD_DIRECTORY = "dist";
export { BUILD_DIRECTORY }
export { BUILD_DIRECTORY as BUILD_DIRECTORY_alias_1 }
export { BUILD_DIRECTORY as BUILD_DIRECTORY_alias_2 }
export { BUILD_DIRECTORY as BUILD_DIRECTORY_alias_3 }

declare class C_Collection<T extends Partial<C_Document>> extends Collection<T> {
}
export { C_Collection }
export { C_Collection as C_Collection_alias_1 }
export { C_Collection as C_Collection_alias_2 }
export { C_Collection as C_Collection_alias_3 }

declare class C_Db extends Db {
}
export { C_Db }
export { C_Db as C_Db_alias_1 }
export { C_Db as C_Db_alias_2 }
export { C_Db as C_Db_alias_3 }

declare class C_Document extends Document_2 {
}
export { C_Document }
export { C_Document as C_Document_alias_1 }
export { C_Document as C_Document_alias_2 }
export { C_Document as C_Document_alias_3 }

declare class C_Model extends Model {
}
export { C_Model }
export { C_Model as C_Model_alias_1 }
export { C_Model as C_Model_alias_2 }
export { C_Model as C_Model_alias_3 }

declare const CHECK_PACKAGE_EMPTY_RESULT: I_CheckPackage;
export { CHECK_PACKAGE_EMPTY_RESULT }
export { CHECK_PACKAGE_EMPTY_RESULT as CHECK_PACKAGE_EMPTY_RESULT_alias_1 }
export { CHECK_PACKAGE_EMPTY_RESULT as CHECK_PACKAGE_EMPTY_RESULT_alias_2 }
export { CHECK_PACKAGE_EMPTY_RESULT as CHECK_PACKAGE_EMPTY_RESULT_alias_3 }

declare function checkPackage(packageName: string, options?: {
    update?: boolean;
}): Promise<I_CheckPackage>;
export { checkPackage }
export { checkPackage as checkPackage_alias_1 }
export { checkPackage as checkPackage_alias_2 }
export { checkPackage as checkPackage_alias_3 }

declare function clearAllErrorLists(): Promise<void>;
export { clearAllErrorLists }
export { clearAllErrorLists as clearAllErrorLists_alias_1 }
export { clearAllErrorLists as clearAllErrorLists_alias_2 }
export { clearAllErrorLists as clearAllErrorLists_alias_3 }

declare const command: {
    simpleGitHooks: () => Promise<string>;
    eslintInspect: () => Promise<string>;
    nodeModulesInspect: () => Promise<string>;
    eslintCheck: () => Promise<string>;
    eslintFix: () => Promise<string>;
    typescriptCheck: () => Promise<string>;
    configureGitHook: () => Promise<string>;
    testUnit: () => Promise<string>;
    testE2e: () => Promise<string>;
    commitLint: () => Promise<string>;
    lintStaged: () => Promise<string>;
    stageBuildDirectory: () => Promise<string>;
    build: () => Promise<string>;
    pnpmInstallStandard: () => Promise<string>;
    pnpmInstallLegacy: () => Promise<string>;
    pnpmInstallForce: () => Promise<string>;
};
export { command }
export { command as command_alias_1 }
export { command as command_alias_2 }
export { command as command_alias_3 }

declare const COMMIT_LINT_CLI = "commitlint";
export { COMMIT_LINT_CLI }
export { COMMIT_LINT_CLI as COMMIT_LINT_CLI_alias_1 }
export { COMMIT_LINT_CLI as COMMIT_LINT_CLI_alias_2 }
export { COMMIT_LINT_CLI as COMMIT_LINT_CLI_alias_3 }

declare const COMMIT_LINT_PACKAGE_NAME = "@commitlint/cli";
export { COMMIT_LINT_PACKAGE_NAME }
export { COMMIT_LINT_PACKAGE_NAME as COMMIT_LINT_PACKAGE_NAME_alias_1 }
export { COMMIT_LINT_PACKAGE_NAME as COMMIT_LINT_PACKAGE_NAME_alias_2 }
export { COMMIT_LINT_PACKAGE_NAME as COMMIT_LINT_PACKAGE_NAME_alias_3 }

declare function createGraphqlCodegenConfig({ uri, from, to, target, }: I_GraphqlCodegenConfig): CodegenConfig;
export { createGraphqlCodegenConfig }
export { createGraphqlCodegenConfig as createGraphqlCodegenConfig_alias_1 }
export { createGraphqlCodegenConfig as createGraphqlCodegenConfig_alias_2 }
export { createGraphqlCodegenConfig as createGraphqlCodegenConfig_alias_3 }

declare const CYBERSKILL_CLI = "cyberskill";
export { CYBERSKILL_CLI }
export { CYBERSKILL_CLI as CYBERSKILL_CLI_alias_1 }
export { CYBERSKILL_CLI as CYBERSKILL_CLI_alias_2 }
export { CYBERSKILL_CLI as CYBERSKILL_CLI_alias_3 }

declare const CYBERSKILL_CLI_PATH = "src/nodejs/cli/index.ts";
export { CYBERSKILL_CLI_PATH }
export { CYBERSKILL_CLI_PATH as CYBERSKILL_CLI_PATH_alias_1 }
export { CYBERSKILL_CLI_PATH as CYBERSKILL_CLI_PATH_alias_2 }
export { CYBERSKILL_CLI_PATH as CYBERSKILL_CLI_PATH_alias_3 }

declare const CYBERSKILL_DIRECTORY: string;
export { CYBERSKILL_DIRECTORY }
export { CYBERSKILL_DIRECTORY as CYBERSKILL_DIRECTORY_alias_1 }
export { CYBERSKILL_DIRECTORY as CYBERSKILL_DIRECTORY_alias_2 }
export { CYBERSKILL_DIRECTORY as CYBERSKILL_DIRECTORY_alias_3 }

declare const CYBERSKILL_PACKAGE_NAME = "@cyberskill/shared";
export { CYBERSKILL_PACKAGE_NAME }
export { CYBERSKILL_PACKAGE_NAME as CYBERSKILL_PACKAGE_NAME_alias_1 }
export { CYBERSKILL_PACKAGE_NAME as CYBERSKILL_PACKAGE_NAME_alias_2 }
export { CYBERSKILL_PACKAGE_NAME as CYBERSKILL_PACKAGE_NAME_alias_3 }

declare const CYBERSKILL_STORAGE = ".cyberskill-storage";
export { CYBERSKILL_STORAGE }
export { CYBERSKILL_STORAGE as CYBERSKILL_STORAGE_alias_1 }
export { CYBERSKILL_STORAGE as CYBERSKILL_STORAGE_alias_2 }
export { CYBERSKILL_STORAGE as CYBERSKILL_STORAGE_alias_3 }

declare const DEBUG: boolean;
export { DEBUG }
export { DEBUG as DEBUG_alias_1 }
export { DEBUG as DEBUG_alias_2 }

declare function deepMerge(...object: T_Object_2[]): T_Object_2;
export { deepMerge }
export { deepMerge as deepMerge_alias_1 }
export { deepMerge as deepMerge_alias_2 }
export { deepMerge as deepMerge_alias_3 }

declare const _default: {
    extends: string[];
};
export { _default as commitlintConfig }
export { _default as commitlintConfig_alias_1 }
export { _default as default_alias }

declare const _default_2: {
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
        'perfectionist/sort-imports': (string | {
            internalPattern: string[];
        })[];
    };
    ignores: string[];
}[];
export { _default_2 as default_alias_1 }
export { _default_2 as eslintConfig }
export { _default_2 as eslintConfig_alias_1 }

declare const _default_3: {
    '*': string[];
};
export { _default_3 as default_alias_2 }
export { _default_3 as lintStagedConfig }
export { _default_3 as lintStagedConfig_alias_1 }

declare enum E_CommandType {
    CLI = "CLI",
    RAW = "RAW"
}
export { E_CommandType }
export { E_CommandType as E_CommandType_alias_1 }
export { E_CommandType as E_CommandType_alias_2 }
export { E_CommandType as E_CommandType_alias_3 }

declare enum E_ConfigType {
    ESLINT = "eslint",
    COMMITLINT = "commitlint",
    LINT_STAGED = "lint-staged",
    VITEST_REACT_E2E = "vitest-react-e2e",
    VITEST_REACT_UNIT = "vitest-react-unit"
}
export { E_ConfigType }
export { E_ConfigType as E_ConfigType_alias_1 }
export { E_ConfigType as E_ConfigType_alias_2 }

declare enum E_IssueType {
    Error = "error",
    Warning = "warning"
}
export { E_IssueType }
export { E_IssueType as E_IssueType_alias_1 }
export { E_IssueType as E_IssueType_alias_2 }
export { E_IssueType as E_IssueType_alias_3 }

declare const ESLINT_CLI = "eslint";
export { ESLINT_CLI }
export { ESLINT_CLI as ESLINT_CLI_alias_1 }
export { ESLINT_CLI as ESLINT_CLI_alias_2 }
export { ESLINT_CLI as ESLINT_CLI_alias_3 }

declare const ESLINT_INSPECT_CLI = "eslint-config-inspector";
export { ESLINT_INSPECT_CLI }
export { ESLINT_INSPECT_CLI as ESLINT_INSPECT_CLI_alias_1 }
export { ESLINT_INSPECT_CLI as ESLINT_INSPECT_CLI_alias_2 }
export { ESLINT_INSPECT_CLI as ESLINT_INSPECT_CLI_alias_3 }

declare const ESLINT_INSPECT_PACKAGE_NAME = "@eslint/config-inspector";
export { ESLINT_INSPECT_PACKAGE_NAME }
export { ESLINT_INSPECT_PACKAGE_NAME as ESLINT_INSPECT_PACKAGE_NAME_alias_1 }
export { ESLINT_INSPECT_PACKAGE_NAME as ESLINT_INSPECT_PACKAGE_NAME_alias_2 }
export { ESLINT_INSPECT_PACKAGE_NAME as ESLINT_INSPECT_PACKAGE_NAME_alias_3 }

declare const ESLINT_PACKAGE_NAME = "eslint";
export { ESLINT_PACKAGE_NAME }
export { ESLINT_PACKAGE_NAME as ESLINT_PACKAGE_NAME_alias_1 }
export { ESLINT_PACKAGE_NAME as ESLINT_PACKAGE_NAME_alias_2 }
export { ESLINT_PACKAGE_NAME as ESLINT_PACKAGE_NAME_alias_3 }

declare function existsSync(...paths: string[]): boolean;
export { existsSync }
export { existsSync as existsSync_alias_1 }
export { existsSync as existsSync_alias_2 }
export { existsSync as existsSync_alias_3 }

declare function formatCommand(command: T_Command, context?: I_CommandContext): string | I_Command_2;
export { formatCommand }
export { formatCommand as formatCommand_alias_1 }
export { formatCommand as formatCommand_alias_2 }
export { formatCommand as formatCommand_alias_3 }

declare function generateShortId(uuid: string, length?: number): string;
export { generateShortId }
export { generateShortId as generateShortId_alias_1 }
export { generateShortId as generateShortId_alias_2 }
export { generateShortId as generateShortId_alias_3 }

declare function generateSlug(str?: string, options?: I_SlugifyOptions): string;
export { generateSlug }
export { generateSlug as generateSlug_alias_1 }
export { generateSlug as generateSlug_alias_2 }
export { generateSlug as generateSlug_alias_3 }

declare function getLatestPackageVersion(packageName: string): Promise<string>;
export { getLatestPackageVersion }
export { getLatestPackageVersion as getLatestPackageVersion_alias_1 }
export { getLatestPackageVersion as getLatestPackageVersion_alias_2 }
export { getLatestPackageVersion as getLatestPackageVersion_alias_3 }

declare function getPackage(packageName: string): I_GetPackage | false;
export { getPackage }
export { getPackage as getPackage_alias_1 }
export { getPackage as getPackage_alias_2 }
export { getPackage as getPackage_alias_3 }

declare function getStoredErrorLists(): Promise<I_IssueEntry[]>;
export { getStoredErrorLists }
export { getStoredErrorLists as getStoredErrorLists_alias_1 }
export { getStoredErrorLists as getStoredErrorLists_alias_2 }
export { getStoredErrorLists as getStoredErrorLists_alias_3 }

declare const GIT_CLI = "git";
export { GIT_CLI }
export { GIT_CLI as GIT_CLI_alias_1 }
export { GIT_CLI as GIT_CLI_alias_2 }
export { GIT_CLI as GIT_CLI_alias_3 }

declare const GIT_COMMIT_EDITMSG = ".git/COMMIT_EDITMSG";
export { GIT_COMMIT_EDITMSG }
export { GIT_COMMIT_EDITMSG as GIT_COMMIT_EDITMSG_alias_1 }
export { GIT_COMMIT_EDITMSG as GIT_COMMIT_EDITMSG_alias_2 }
export { GIT_COMMIT_EDITMSG as GIT_COMMIT_EDITMSG_alias_3 }

declare const GIT_HOOK = ".git/hooks/";
export { GIT_HOOK }
export { GIT_HOOK as GIT_HOOK_alias_1 }
export { GIT_HOOK as GIT_HOOK_alias_2 }
export { GIT_HOOK as GIT_HOOK_alias_3 }

declare const GIT_IGNORE = ".gitignore";
export { GIT_IGNORE }
export { GIT_IGNORE as GIT_IGNORE_alias_1 }
export { GIT_IGNORE as GIT_IGNORE_alias_2 }
export { GIT_IGNORE as GIT_IGNORE_alias_3 }

declare const GRAPHQL_URI_DEFAULT = "/graphql";
export { GRAPHQL_URI_DEFAULT }
export { GRAPHQL_URI_DEFAULT as GRAPHQL_URI_DEFAULT_alias_1 }
export { GRAPHQL_URI_DEFAULT as GRAPHQL_URI_DEFAULT_alias_2 }
export { GRAPHQL_URI_DEFAULT as GRAPHQL_URI_DEFAULT_alias_3 }

declare function HOOK({ isCurrentProject }: Partial<I_CommandContext>): {
    'pre-push'?: {
        raw: boolean;
        cmd: string;
    };
    'pre-commit': string;
    'commit-msg': string;
};
export { HOOK }
export { HOOK as HOOK_alias_1 }
export { HOOK as HOOK_alias_2 }
export { HOOK as HOOK_alias_3 }

declare interface I_ApolloErrorContext {
    error: ApolloError_2 | null;
    showError: (error: ApolloError_2) => void;
    hideError: () => void;
}
export { I_ApolloErrorContext }
export { I_ApolloErrorContext as I_ApolloErrorContext_alias_1 }
export { I_ApolloErrorContext as I_ApolloErrorContext_alias_2 }
export { I_ApolloErrorContext as I_ApolloErrorContext_alias_3 }

declare interface I_ApolloOptions extends Omit<ApolloClientOptions<NormalizedCacheObject>, 'cache'> {
    uri?: string | UriFunction;
    wsUrl?: string;
    cache?: ApolloCache<NormalizedCacheObject>;
    customLinks?: ApolloLink[];
    ssrMode?: boolean;
}
export { I_ApolloOptions }
export { I_ApolloOptions as I_ApolloOptions_alias_1 }
export { I_ApolloOptions as I_ApolloOptions_alias_2 }
export { I_ApolloOptions as I_ApolloOptions_alias_3 }

declare interface I_ApolloProviderProps extends I_Children_2 {
    isNextJS?: boolean;
    options?: I_ApolloOptions;
    client?: ApolloClient<NormalizedCacheObject>;
    makeClient?: () => ApolloClient<NormalizedCacheObject>;
    provider?: ComponentType<I_ApolloProviderProps>;
    cache?: ApolloCache<NormalizedCacheObject>;
}
export { I_ApolloProviderProps }
export { I_ApolloProviderProps as I_ApolloProviderProps_alias_1 }
export { I_ApolloProviderProps as I_ApolloProviderProps_alias_2 }
export { I_ApolloProviderProps as I_ApolloProviderProps_alias_3 }

declare interface I_CheckPackage {
    isCurrentProject: boolean;
    installedPath: string;
    file: T_PackageJson;
    isUpToDate: boolean;
}
export { I_CheckPackage }
export { I_CheckPackage as I_CheckPackage_alias_1 }
export { I_CheckPackage as I_CheckPackage_alias_2 }
export { I_CheckPackage as I_CheckPackage_alias_3 }

declare interface I_Children {
    children: T_Children;
}
export { I_Children }
export { I_Children as I_Children_alias_1 }
export { I_Children as I_Children_alias_2 }

declare interface I_Children_2 {
    children: T_Children_2;
}

declare interface I_Command {
    raw: boolean;
    cmd: string;
}
export { I_Command }
export { I_Command as I_Command_alias_1 }
export { I_Command as I_Command_alias_2 }
export { I_Command as I_Command_alias_3 }

declare interface I_CommandContext {
    isRemote: boolean;
    isCurrentProject: boolean;
}
export { I_CommandContext }
export { I_CommandContext as I_CommandContext_alias_1 }
export { I_CommandContext as I_CommandContext_alias_2 }
export { I_CommandContext as I_CommandContext_alias_3 }

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
export { I_CreateModelOptions as I_CreateModelOptions_alias_3 }

declare interface I_CreateSchemaOptions<T extends Partial<C_Document>> extends I_MongooseOptions<T> {
    schema: T_Input_MongooseSchema<T>;
    standalone?: boolean;
}
export { I_CreateSchemaOptions }
export { I_CreateSchemaOptions as I_CreateSchemaOptions_alias_1 }
export { I_CreateSchemaOptions as I_CreateSchemaOptions_alias_2 }
export { I_CreateSchemaOptions as I_CreateSchemaOptions_alias_3 }

declare interface I_DeleteOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}
export { I_DeleteOptionsExtended }
export { I_DeleteOptionsExtended as I_DeleteOptionsExtended_alias_1 }
export { I_DeleteOptionsExtended as I_DeleteOptionsExtended_alias_2 }
export { I_DeleteOptionsExtended as I_DeleteOptionsExtended_alias_3 }

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
export { I_EslintError as I_EslintError_alias_3 }

declare interface I_ExtendedModel<T extends Partial<C_Document>> extends Model<T>, PaginateModel<T>, AggregatePaginateModel<T> {
}
export { I_ExtendedModel }
export { I_ExtendedModel as I_ExtendedModel_alias_1 }
export { I_ExtendedModel as I_ExtendedModel_alias_2 }
export { I_ExtendedModel as I_ExtendedModel_alias_3 }

declare interface I_GenericDocument extends Partial<C_Document> {
    id: string;
    isDel: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}
export { I_GenericDocument }
export { I_GenericDocument as I_GenericDocument_alias_1 }
export { I_GenericDocument as I_GenericDocument_alias_2 }
export { I_GenericDocument as I_GenericDocument_alias_3 }

declare interface I_GetPackage {
    path: string;
    file: T_PackageJson;
    isCurrentProject: boolean;
    isDepend: boolean;
    isDevDepend: boolean;
}
export { I_GetPackage }
export { I_GetPackage as I_GetPackage_alias_1 }
export { I_GetPackage as I_GetPackage_alias_2 }
export { I_GetPackage as I_GetPackage_alias_3 }

declare interface I_GraphqlCodegenConfig {
    uri: string;
    from: string;
    to: string;
    target: 'client' | 'server';
}
export { I_GraphqlCodegenConfig }
export { I_GraphqlCodegenConfig as I_GraphqlCodegenConfig_alias_1 }
export { I_GraphqlCodegenConfig as I_GraphqlCodegenConfig_alias_2 }
export { I_GraphqlCodegenConfig as I_GraphqlCodegenConfig_alias_3 }

declare interface I_Input_CreateMany<T> {
    docs: T[];
}
export { I_Input_CreateMany }
export { I_Input_CreateMany as I_Input_CreateMany_alias_1 }
export { I_Input_CreateMany as I_Input_CreateMany_alias_2 }
export { I_Input_CreateMany as I_Input_CreateMany_alias_3 }

declare interface I_Input_CreateOne<T> {
    doc: T;
}
export { I_Input_CreateOne }
export { I_Input_CreateOne as I_Input_CreateOne_alias_1 }
export { I_Input_CreateOne as I_Input_CreateOne_alias_2 }
export { I_Input_CreateOne as I_Input_CreateOne_alias_3 }

declare interface I_Input_DeleteMany<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}
export { I_Input_DeleteMany }
export { I_Input_DeleteMany as I_Input_DeleteMany_alias_1 }
export { I_Input_DeleteMany as I_Input_DeleteMany_alias_2 }
export { I_Input_DeleteMany as I_Input_DeleteMany_alias_3 }

declare interface I_Input_DeleteOne<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}
export { I_Input_DeleteOne }
export { I_Input_DeleteOne as I_Input_DeleteOne_alias_1 }
export { I_Input_DeleteOne as I_Input_DeleteOne_alias_2 }
export { I_Input_DeleteOne as I_Input_DeleteOne_alias_3 }

declare interface I_Input_FindAll<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}
export { I_Input_FindAll }
export { I_Input_FindAll as I_Input_FindAll_alias_1 }
export { I_Input_FindAll as I_Input_FindAll_alias_2 }
export { I_Input_FindAll as I_Input_FindAll_alias_3 }

declare interface I_Input_FindOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}
export { I_Input_FindOne }
export { I_Input_FindOne as I_Input_FindOne_alias_1 }
export { I_Input_FindOne as I_Input_FindOne_alias_2 }
export { I_Input_FindOne as I_Input_FindOne_alias_3 }

declare interface I_Input_FindPaging<T> {
    filter?: T_FilterQuery<T>;
    options?: T_PaginateOptionsWithPopulate;
}
export { I_Input_FindPaging }
export { I_Input_FindPaging as I_Input_FindPaging_alias_1 }
export { I_Input_FindPaging as I_Input_FindPaging_alias_2 }
export { I_Input_FindPaging as I_Input_FindPaging_alias_3 }

declare interface I_Input_FindPagingAggregate {
    pipeline: T_PipelineStage[];
    options?: T_PaginateOptionsWithPopulate;
}
export { I_Input_FindPagingAggregate }
export { I_Input_FindPagingAggregate as I_Input_FindPagingAggregate_alias_1 }
export { I_Input_FindPagingAggregate as I_Input_FindPagingAggregate_alias_2 }
export { I_Input_FindPagingAggregate as I_Input_FindPagingAggregate_alias_3 }

declare interface I_Input_UpdateMany<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}
export { I_Input_UpdateMany }
export { I_Input_UpdateMany as I_Input_UpdateMany_alias_1 }
export { I_Input_UpdateMany as I_Input_UpdateMany_alias_2 }
export { I_Input_UpdateMany as I_Input_UpdateMany_alias_3 }

declare interface I_Input_UpdateOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}
export { I_Input_UpdateOne }
export { I_Input_UpdateOne as I_Input_UpdateOne_alias_1 }
export { I_Input_UpdateOne as I_Input_UpdateOne_alias_2 }
export { I_Input_UpdateOne as I_Input_UpdateOne_alias_3 }

declare interface I_IssueEntry {
    type: E_IssueType;
    file: string;
    message: string;
    position?: string;
    rule?: string;
}
export { I_IssueEntry }
export { I_IssueEntry as I_IssueEntry_alias_1 }
export { I_IssueEntry as I_IssueEntry_alias_2 }
export { I_IssueEntry as I_IssueEntry_alias_3 }

declare interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}
export { I_LoadingContext }
export { I_LoadingContext as I_LoadingContext_alias_1 }
export { I_LoadingContext as I_LoadingContext_alias_2 }
export { I_LoadingContext as I_LoadingContext_alias_3 }

declare interface I_LoadingProps {
    full?: boolean;
    block?: boolean;
    className?: string;
    message?: string;
}
export { I_LoadingProps }
export { I_LoadingProps as I_LoadingProps_alias_1 }
export { I_LoadingProps as I_LoadingProps_alias_2 }
export { I_LoadingProps as I_LoadingProps_alias_3 }

declare interface I_Log {
    silent: typeof consola['silent'];
    level: typeof consola['level'];
    fatal: typeof consola['fatal'];
    error: typeof consola['error'];
    warn: typeof consola['warn'];
    log: typeof consola['log'];
    info: typeof consola['info'];
    success: typeof consola['success'];
    ready: typeof consola['ready'];
    start: typeof consola['start'];
    box: typeof consola['box'];
    debug: typeof consola['debug'];
    trace: typeof consola['trace'];
    verbose: typeof consola['verbose'];
}
export { I_Log }
export { I_Log as I_Log_alias_1 }
export { I_Log as I_Log_alias_2 }
export { I_Log as I_Log_alias_3 }

declare interface I_Log_2 {
    silent: typeof consola['silent'];
    level: typeof consola['level'];
    fatal: typeof consola['fatal'];
    error: typeof consola['error'];
    warn: typeof consola['warn'];
    log: typeof consola['log'];
    info: typeof consola['info'];
    success: typeof consola['success'];
    ready: typeof consola['ready'];
    start: typeof consola['start'];
    box: typeof consola['box'];
    debug: typeof consola['debug'];
    trace: typeof consola['trace'];
    verbose: typeof consola['verbose'];
}

declare interface I_Log_NodeJS extends I_Log_2 {
    printBoxedLog: (title: string, issues: I_IssueEntry[], color?: string) => void;
}
export { I_Log_NodeJS }
export { I_Log_NodeJS as I_Log_NodeJS_alias_1 }
export { I_Log_NodeJS as I_Log_NodeJS_alias_2 }
export { I_Log_NodeJS as I_Log_NodeJS_alias_3 }

declare interface I_MongooseModelMiddleware<T extends Partial<C_Document>> {
    method: T_MongooseMiddlewareMethod;
    pre?: T_MongooseMiddlewarePreFunction<T & T_QueryWithHelpers<T>>;
    post?: T_MongooseMiddlewarePostFunction<T>;
}
export { I_MongooseModelMiddleware }
export { I_MongooseModelMiddleware as I_MongooseModelMiddleware_alias_1 }
export { I_MongooseModelMiddleware as I_MongooseModelMiddleware_alias_2 }
export { I_MongooseModelMiddleware as I_MongooseModelMiddleware_alias_3 }

declare interface I_MongooseOptions<T extends Partial<C_Document>> {
    mongoose: typeof mongoose;
    virtuals?: {
        name: keyof T | string;
        options?: I_VirtualOptions;
        get?: (this: T) => void;
    }[];
}
export { I_MongooseOptions }
export { I_MongooseOptions as I_MongooseOptions_alias_1 }
export { I_MongooseOptions as I_MongooseOptions_alias_2 }
export { I_MongooseOptions as I_MongooseOptions_alias_3 }

declare interface I_NextIntlContext {
    languages: I_NextIntlLanguage[];
    currentLanguage: I_NextIntlLanguage;
    setCurrentLanguage: (newLang: I_NextIntlLanguage) => void;
}
export { I_NextIntlContext }
export { I_NextIntlContext as I_NextIntlContext_alias_1 }
export { I_NextIntlContext as I_NextIntlContext_alias_2 }
export { I_NextIntlContext as I_NextIntlContext_alias_3 }

declare interface I_NextIntlLanguage {
    label: string;
    value: string;
    flag: string;
    adapterLocale: Locale_2;
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
export { I_NextIntlLanguage as I_NextIntlLanguage_alias_3 }

declare interface I_NextIntlProviderProps extends I_Children_2 {
    languages: I_NextIntlLanguage[];
    messages: T_NextIntlMessageList;
}
export { I_NextIntlProviderProps }
export { I_NextIntlProviderProps as I_NextIntlProviderProps_alias_1 }
export { I_NextIntlProviderProps as I_NextIntlProviderProps_alias_2 }
export { I_NextIntlProviderProps as I_NextIntlProviderProps_alias_3 }

declare type I_Return<T = void, E = unknown> = I_ReturnSuccess<T, E> | I_ReturnFailure;
export { I_Return }
export { I_Return as I_Return_alias_1 }
export { I_Return as I_Return_alias_2 }
export { I_Return as I_Return_alias_3 }

declare interface I_ReturnFailure {
    success: false;
    message: string;
    code: number | string;
}
export { I_ReturnFailure }
export { I_ReturnFailure as I_ReturnFailure_alias_1 }
export { I_ReturnFailure as I_ReturnFailure_alias_2 }
export { I_ReturnFailure as I_ReturnFailure_alias_3 }

declare interface I_ReturnSuccess<T, E = unknown> {
    success: true;
    result: T & E;
    message?: string;
    code?: number | string;
}
export { I_ReturnSuccess }
export { I_ReturnSuccess as I_ReturnSuccess_alias_1 }
export { I_ReturnSuccess as I_ReturnSuccess_alias_2 }
export { I_ReturnSuccess as I_ReturnSuccess_alias_3 }

declare interface I_Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}
export { I_Serializer }
export { I_Serializer as I_Serializer_alias_1 }
export { I_Serializer as I_Serializer_alias_2 }
export { I_Serializer as I_Serializer_alias_3 }

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
export { I_SlugifyOptions as I_SlugifyOptions_alias_3 }

declare interface I_UpdateOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}
export { I_UpdateOptionsExtended }
export { I_UpdateOptionsExtended as I_UpdateOptionsExtended_alias_1 }
export { I_UpdateOptionsExtended as I_UpdateOptionsExtended_alias_2 }
export { I_UpdateOptionsExtended as I_UpdateOptionsExtended_alias_3 }

declare interface I_VirtualNestedOptions {
    [key: string]: I_VirtualNestedOptions | number | string | boolean;
}

declare interface I_VirtualOptions {
    ref: string;
    localField: string;
    foreignField: string;
    count?: boolean;
    justOne?: boolean;
    options?: I_VirtualNestedOptions;
}

declare function initI18next(options: InitOptions): Promise<TFunction<"translation", undefined>>;
export { initI18next }
export { initI18next as initI18next_alias_1 }
export { initI18next as initI18next_alias_2 }
export { initI18next as initI18next_alias_3 }

declare function installDependencies(): Promise<void>;
export { installDependencies }
export { installDependencies as installDependencies_alias_1 }
export { installDependencies as installDependencies_alias_2 }
export { installDependencies as installDependencies_alias_3 }

declare const IS_BROWSER: boolean;
export { IS_BROWSER }
export { IS_BROWSER as IS_BROWSER_alias_1 }
export { IS_BROWSER as IS_BROWSER_alias_2 }

declare function isJson(str: string): boolean;
export { isJson }
export { isJson as isJson_alias_1 }
export { isJson as isJson_alias_2 }
export { isJson as isJson_alias_3 }

declare function isPlainObject(val: unknown): val is T_Object_2;
export { isPlainObject }
export { isPlainObject as isPlainObject_alias_1 }
export { isPlainObject as isPlainObject_alias_2 }
export { isPlainObject as isPlainObject_alias_3 }

declare function join(...urls: string[]): string;
export { join }
export { join as join_alias_1 }
export { join as join_alias_2 }
export { join as join_alias_3 }

declare const LINT_STAGED_CLI = "lint-staged";
export { LINT_STAGED_CLI }
export { LINT_STAGED_CLI as LINT_STAGED_CLI_alias_1 }
export { LINT_STAGED_CLI as LINT_STAGED_CLI_alias_2 }
export { LINT_STAGED_CLI as LINT_STAGED_CLI_alias_3 }

declare const LINT_STAGED_PACKAGE_NAME = "lint-staged";
export { LINT_STAGED_PACKAGE_NAME }
export { LINT_STAGED_PACKAGE_NAME as LINT_STAGED_PACKAGE_NAME_alias_1 }
export { LINT_STAGED_PACKAGE_NAME as LINT_STAGED_PACKAGE_NAME_alias_2 }
export { LINT_STAGED_PACKAGE_NAME as LINT_STAGED_PACKAGE_NAME_alias_3 }

declare function Loading({ full, block, className, message, ...rest }: I_LoadingProps): JSX_2.Element;
export { Loading }
export { Loading as Loading_alias_1 }
export { Loading as Loading_alias_2 }
export { Loading as Loading_alias_3 }

declare const LoadingContext: Context<I_LoadingContext | undefined>;
export { LoadingContext }
export { LoadingContext as LoadingContext_alias_1 }
export { LoadingContext as LoadingContext_alias_2 }
export { LoadingContext as LoadingContext_alias_3 }

declare function LoadingProvider({ children }: I_Children_2): JSX_2.Element;
export { LoadingProvider }
export { LoadingProvider as LoadingProvider_alias_1 }
export { LoadingProvider as LoadingProvider_alias_2 }
export { LoadingProvider as LoadingProvider_alias_3 }

declare const log: I_Log;
export { log }
export { log as log_alias_1 }
export { log as log_alias_2 }
export { log as log_alias_3 }

declare const logNodeJS: I_Log_NodeJS;
export { logNodeJS }
export { logNodeJS as logNodeJS_alias_1 }
export { logNodeJS as logNodeJS_alias_2 }
export { logNodeJS as logNodeJS_alias_3 }

declare function mergeConfigs(type: T_ConfigType, ...configs: T_Object_2[]): T_Object_2;
export { mergeConfigs }
export { mergeConfigs as mergeConfigs_alias_1 }
export { mergeConfigs as mergeConfigs_alias_2 }

declare const mongo: {
    getDateTime(now?: Date): string;
    createGenericFields({ returnDateAs, }?: {
        returnDateAs?: "string" | "date";
    }): I_GenericDocument;
    applyPlugins<T>(schema: T_MongooseShema<T>, plugins: Array<T_MongoosePlugin | false>): void;
    applyMiddlewares<T extends Partial<C_Document>>(schema: T_MongooseShema<T>, middlewares: I_MongooseModelMiddleware<T>[]): void;
    createGenericSchema(mongoose: typeof mongooseRaw): mongooseRaw.Schema<I_GenericDocument, mongooseRaw.Model<I_GenericDocument, any, any, any, mongooseRaw.Document<unknown, any, I_GenericDocument> & I_GenericDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>, {}, {}, {}, {}, mongooseRaw.DefaultSchemaOptions, I_GenericDocument, mongooseRaw.Document<unknown, {}, mongooseRaw.FlatRecord<I_GenericDocument>> & mongooseRaw.FlatRecord<I_GenericDocument> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createSchema<T extends Partial<C_Document>>({ mongoose, schema, virtuals, standalone, }: I_CreateSchemaOptions<T>): T_MongooseShema<T>;
    createModel<T extends Partial<C_Document>>({ mongoose: currentMongooseInstance, name, schema, pagination, aggregate, virtuals, middlewares, }: I_CreateModelOptions<T>): I_ExtendedModel<T>;
    createSlugQuery<T>(slug: string, filters?: T_FilterQuery<T>, id?: string): T_CreateSlugQueryResponse<T>;
    validator: {
        isEmpty<T>(): (this: T, value: unknown) => Promise<boolean>;
        isUnique<T extends {
            constructor: {
                findOne: (query: Record<string, unknown>) => Promise<unknown>;
            };
        }>(fields: string[]): (this: T, value: unknown) => Promise<boolean>;
        matchesRegex(regexArray: RegExp[]): (value: string) => Promise<boolean>;
    };
};
export { mongo }
export { mongo as mongo_alias_1 }
export { mongo as mongo_alias_2 }
export { mongo as mongo_alias_3 }

declare class MongoController<D extends Partial<C_Document>> {
    private collection;
    constructor(db: C_Db, collectionName: string);
    createOne(document: D): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertOneResult<D>;
    }>;
    createMany(documents: D[]): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertManyResult<D>;
    }>;
    findOne(filter: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_WithId<D> | null;
    }>;
    findAll(filter?: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_WithId<D>[];
    }>;
    count(filter?: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: number;
    }>;
    updateOne(filter: T_Filter<D>, update: Partial<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_UpdateResult;
    }>;
    updateMany(filter: T_Filter<D>, update: Partial<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_UpdateResult;
    }>;
    deleteOne(filter: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_DeleteResult;
    }>;
    deleteMany(filter: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_DeleteResult;
    }>;
}
export { MongoController }
export { MongoController as MongoController_alias_1 }
export { MongoController as MongoController_alias_2 }
export { MongoController as MongoController_alias_3 }

declare class MongooseController<T extends Partial<C_Document>> {
    private model;
    constructor(model: I_ExtendedModel<T>);
    private getModelName;
    findOne(filter?: T_FilterQuery<T>, projection?: T_ProjectionType<T>, options?: T_QueryOptions<T>, populate?: T_Input_Populate): Promise<I_Return<T>>;
    findAll(filter?: T_FilterQuery<T>, projection?: T_ProjectionType<T>, options?: T_QueryOptions<T>, populate?: T_Input_Populate): Promise<I_Return<T[]>>;
    findPaging(filter?: T_FilterQuery<T>, options?: T_PaginateOptionsWithPopulate): Promise<I_Return<T_PaginateResult<T>>>;
    findPagingAggregate(pipeline: T_PipelineStage[], options?: T_PaginateOptionsWithPopulate): Promise<I_Return<T_AggregatePaginateResult<T>>>;
    count(filter?: T_FilterQuery<T>): Promise<I_Return<number>>;
    createOne(doc: T | Partial<T>): Promise<I_Return<T>>;
    createMany(docs: (T | Partial<T>)[], options?: T_InsertManyOptions): Promise<I_Return<T[]>>;
    updateOne(filter?: T_FilterQuery<T>, update?: T_UpdateQuery<T>, options?: I_UpdateOptionsExtended): Promise<I_Return<T>>;
    updateMany(filter?: T_FilterQuery<T>, update?: T_UpdateQuery<T>, options?: I_UpdateOptionsExtended): Promise<I_Return<T_UpdateResult>>;
    deleteOne(filter?: T_FilterQuery<T>, options?: I_DeleteOptionsExtended): Promise<I_Return<T>>;
    deleteMany(filter?: T_FilterQuery<T>, options?: I_DeleteOptionsExtended): Promise<I_Return<T_DeleteResult>>;
    createShortId(id: string, length?: number): Promise<I_Return<string>>;
    createSlug(fieldName: string, fields: T, filters?: T_FilterQuery<T>): Promise<I_Return<string | {
        [key: string]: string;
    }>>;
    aggregate(pipeline: T_PipelineStage[]): Promise<I_Return<T[]>>;
}
export { MongooseController }
export { MongooseController as MongooseController_alias_1 }
export { MongooseController as MongooseController_alias_2 }
export { MongooseController as MongooseController_alias_3 }

export { mongoosePaginate }
export { mongoosePaginate as mongoosePaginate_alias_1 }
export { mongoosePaginate as mongoosePaginate_alias_2 }
export { mongoosePaginate as mongoosePaginate_alias_3 }

declare const NEXT_INTL_DEFAULT_LANGUAGE: {
    label: string;
    value: string;
    flag: string;
    adapterLocale: Locale;
    icon: string;
    numberFormat: {
        code: string;
        currency: string;
    };
    timezone: string;
};
export { NEXT_INTL_DEFAULT_LANGUAGE }
export { NEXT_INTL_DEFAULT_LANGUAGE as NEXT_INTL_DEFAULT_LANGUAGE_alias_1 }
export { NEXT_INTL_DEFAULT_LANGUAGE as NEXT_INTL_DEFAULT_LANGUAGE_alias_2 }
export { NEXT_INTL_DEFAULT_LANGUAGE as NEXT_INTL_DEFAULT_LANGUAGE_alias_3 }

declare const NextIntlContext: Context<I_NextIntlContext | undefined>;
export { NextIntlContext }
export { NextIntlContext as NextIntlContext_alias_1 }
export { NextIntlContext as NextIntlContext_alias_2 }
export { NextIntlContext as NextIntlContext_alias_3 }

declare function NextIntlProvider({ children, languages, messages, }: I_NextIntlProviderProps): JSX_2.Element;
export { NextIntlProvider }
export { NextIntlProvider as NextIntlProvider_alias_1 }
export { NextIntlProvider as NextIntlProvider_alias_2 }
export { NextIntlProvider as NextIntlProvider_alias_3 }

declare const NODE_MODULES = "node_modules";
export { NODE_MODULES }
export { NODE_MODULES as NODE_MODULES_alias_1 }
export { NODE_MODULES as NODE_MODULES_alias_2 }
export { NODE_MODULES as NODE_MODULES_alias_3 }

declare const NODE_MODULES_INSPECT_CLI = "node-modules-inspector";
export { NODE_MODULES_INSPECT_CLI }
export { NODE_MODULES_INSPECT_CLI as NODE_MODULES_INSPECT_CLI_alias_1 }
export { NODE_MODULES_INSPECT_CLI as NODE_MODULES_INSPECT_CLI_alias_2 }
export { NODE_MODULES_INSPECT_CLI as NODE_MODULES_INSPECT_CLI_alias_3 }

declare const NODE_MODULES_INSPECT_PACKAGE_NAME = "node-modules-inspector";
export { NODE_MODULES_INSPECT_PACKAGE_NAME }
export { NODE_MODULES_INSPECT_PACKAGE_NAME as NODE_MODULES_INSPECT_PACKAGE_NAME_alias_1 }
export { NODE_MODULES_INSPECT_PACKAGE_NAME as NODE_MODULES_INSPECT_PACKAGE_NAME_alias_2 }
export { NODE_MODULES_INSPECT_PACKAGE_NAME as NODE_MODULES_INSPECT_PACKAGE_NAME_alias_3 }

declare const PACKAGE_JSON = "package.json";
export { PACKAGE_JSON }
export { PACKAGE_JSON as PACKAGE_JSON_alias_1 }
export { PACKAGE_JSON as PACKAGE_JSON_alias_2 }
export { PACKAGE_JSON as PACKAGE_JSON_alias_3 }

declare const PACKAGE_LOCK_JSON = "package-lock.json";
export { PACKAGE_LOCK_JSON }
export { PACKAGE_LOCK_JSON as PACKAGE_LOCK_JSON_alias_1 }
export { PACKAGE_LOCK_JSON as PACKAGE_LOCK_JSON_alias_2 }
export { PACKAGE_LOCK_JSON as PACKAGE_LOCK_JSON_alias_3 }

declare const PATH: {
    CYBERSKILL_DIRECTORY: string;
    WORKING_DIRECTORY: string;
    TS_CONFIG: string;
    GIT_IGNORE: string;
    GIT_HOOK: string;
    GIT_COMMIT_MSG: string;
    SIMPLE_GIT_HOOKS_JSON: string;
    PACKAGE_JSON: string;
    PACKAGE_LOCK_JSON: string;
    PNPM_LOCK_YAML: string;
    NODE_MODULES: string;
    LINT_STAGED_CONFIG: string;
    COMMITLINT_CONFIG: string;
    UNIT_TEST_CONFIG: string;
    UNIT_TEST_SETUP_CONFIG: string;
    E2E_TEST_CONFIG: string;
};
export { PATH }
export { PATH as PATH_alias_1 }
export { PATH as PATH_alias_2 }
export { PATH as PATH_alias_3 }

declare const PLAYWRIGHT_PACKAGE_NAME = "playwright";
export { PLAYWRIGHT_PACKAGE_NAME }
export { PLAYWRIGHT_PACKAGE_NAME as PLAYWRIGHT_PACKAGE_NAME_alias_1 }
export { PLAYWRIGHT_PACKAGE_NAME as PLAYWRIGHT_PACKAGE_NAME_alias_2 }
export { PLAYWRIGHT_PACKAGE_NAME as PLAYWRIGHT_PACKAGE_NAME_alias_3 }

declare const PNPM_CLI = "pnpm";
export { PNPM_CLI }
export { PNPM_CLI as PNPM_CLI_alias_1 }
export { PNPM_CLI as PNPM_CLI_alias_2 }
export { PNPM_CLI as PNPM_CLI_alias_3 }

declare const PNPM_EXEC_CLI = "pnpm exec";
export { PNPM_EXEC_CLI }
export { PNPM_EXEC_CLI as PNPM_EXEC_CLI_alias_1 }
export { PNPM_EXEC_CLI as PNPM_EXEC_CLI_alias_2 }
export { PNPM_EXEC_CLI as PNPM_EXEC_CLI_alias_3 }

declare const PNPM_LOCK_YAML = "pnpm-lock.yaml";
export { PNPM_LOCK_YAML }
export { PNPM_LOCK_YAML as PNPM_LOCK_YAML_alias_1 }
export { PNPM_LOCK_YAML as PNPM_LOCK_YAML_alias_2 }
export { PNPM_LOCK_YAML as PNPM_LOCK_YAML_alias_3 }

declare function rawCommand(cmd: string): {
    raw: boolean;
    cmd: string;
};
export { rawCommand }
export { rawCommand as rawCommand_alias_1 }
export { rawCommand as rawCommand_alias_2 }
export { rawCommand as rawCommand_alias_3 }

declare function readFileSync(filePath: string, options: {
    asJson: true;
}): T_Object_2;

declare function readFileSync(filePath: string, options?: {
    asJson?: false;
}): string;
export { readFileSync }
export { readFileSync as readFileSync_alias_1 }
export { readFileSync as readFileSync_alias_2 }
export { readFileSync as readFileSync_alias_3 }

declare function regexSearchMapper(str: string): string;
export { regexSearchMapper }
export { regexSearchMapper as regexSearchMapper_alias_1 }
export { regexSearchMapper as regexSearchMapper_alias_2 }
export { regexSearchMapper as regexSearchMapper_alias_3 }

declare function removeAccent(str: string): string;
export { removeAccent }
export { removeAccent as removeAccent_alias_1 }
export { removeAccent as removeAccent_alias_2 }
export { removeAccent as removeAccent_alias_3 }

declare function resolve(...urls: string[]): string;
export { resolve }
export { resolve as resolve_alias_1 }
export { resolve as resolve_alias_2 }
export { resolve as resolve_alias_3 }

declare function resolveCommands(input: T_CommandMapInput, context?: Partial<I_CommandContext>): Promise<{
    [k: string]: string | I_Command_2;
}>;
export { resolveCommands }
export { resolveCommands as resolveCommands_alias_1 }
export { resolveCommands as resolveCommands_alias_2 }
export { resolveCommands as resolveCommands_alias_3 }

declare function resolveWorkingPath(...urls: string[]): string;
export { resolveWorkingPath }
export { resolveWorkingPath as resolveWorkingPath_alias_1 }
export { resolveWorkingPath as resolveWorkingPath_alias_2 }
export { resolveWorkingPath as resolveWorkingPath_alias_3 }

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

declare function rmSync(...paths: string[]): void;
export { rmSync }
export { rmSync as rmSync_alias_1 }
export { rmSync as rmSync_alias_2 }
export { rmSync as rmSync_alias_3 }

declare function runCommand(label: string, command: string): Promise<void>;
export { runCommand }
export { runCommand as runCommand_alias_1 }
export { runCommand as runCommand_alias_2 }
export { runCommand as runCommand_alias_3 }

declare const serializer: I_Serializer<unknown>;
export { serializer }
export { serializer as serializer_alias_1 }
export { serializer as serializer_alias_2 }
export { serializer as serializer_alias_3 }

declare function setGlobalApolloErrorCallback(callback: (err: ApolloError_2) => void): void;
export { setGlobalApolloErrorCallback }
export { setGlobalApolloErrorCallback as setGlobalApolloErrorCallback_alias_1 }
export { setGlobalApolloErrorCallback as setGlobalApolloErrorCallback_alias_2 }
export { setGlobalApolloErrorCallback as setGlobalApolloErrorCallback_alias_3 }

declare function setupPackages(packages: string[], options?: {
    update?: boolean;
    postInstallActions?: (() => Promise<void>)[];
}): Promise<void>;
export { setupPackages }
export { setupPackages as setupPackages_alias_1 }
export { setupPackages as setupPackages_alias_2 }
export { setupPackages as setupPackages_alias_3 }

declare function showGlobalApolloError(error: ApolloError_2): void;
export { showGlobalApolloError }
export { showGlobalApolloError as showGlobalApolloError_alias_1 }
export { showGlobalApolloError as showGlobalApolloError_alias_2 }
export { showGlobalApolloError as showGlobalApolloError_alias_3 }

declare const SIMPLE_GIT_HOOK_CLI = "simple-git-hooks";
export { SIMPLE_GIT_HOOK_CLI }
export { SIMPLE_GIT_HOOK_CLI as SIMPLE_GIT_HOOK_CLI_alias_1 }
export { SIMPLE_GIT_HOOK_CLI as SIMPLE_GIT_HOOK_CLI_alias_2 }
export { SIMPLE_GIT_HOOK_CLI as SIMPLE_GIT_HOOK_CLI_alias_3 }

declare const SIMPLE_GIT_HOOK_JSON = ".simple-git-hooks.json";
export { SIMPLE_GIT_HOOK_JSON }
export { SIMPLE_GIT_HOOK_JSON as SIMPLE_GIT_HOOK_JSON_alias_1 }
export { SIMPLE_GIT_HOOK_JSON as SIMPLE_GIT_HOOK_JSON_alias_2 }
export { SIMPLE_GIT_HOOK_JSON as SIMPLE_GIT_HOOK_JSON_alias_3 }

declare const SIMPLE_GIT_HOOKS_PACKAGE_NAME = "simple-git-hooks";
export { SIMPLE_GIT_HOOKS_PACKAGE_NAME }
export { SIMPLE_GIT_HOOKS_PACKAGE_NAME as SIMPLE_GIT_HOOKS_PACKAGE_NAME_alias_1 }
export { SIMPLE_GIT_HOOKS_PACKAGE_NAME as SIMPLE_GIT_HOOKS_PACKAGE_NAME_alias_2 }
export { SIMPLE_GIT_HOOKS_PACKAGE_NAME as SIMPLE_GIT_HOOKS_PACKAGE_NAME_alias_3 }

declare const storage: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
};
export { storage }
export { storage as storage_alias_1 }
export { storage as storage_alias_2 }
export { storage as storage_alias_3 }

declare const storageNodeJS: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
    getLogLink(key: string): Promise<string | null>;
};
export { storageNodeJS }
export { storageNodeJS as storageNodeJS_alias_1 }
export { storageNodeJS as storageNodeJS_alias_2 }
export { storageNodeJS as storageNodeJS_alias_3 }

declare type T_AggregatePaginateResult<T> = AggregatePaginateResult<T>;
export { T_AggregatePaginateResult }
export { T_AggregatePaginateResult as T_AggregatePaginateResult_alias_1 }
export { T_AggregatePaginateResult as T_AggregatePaginateResult_alias_2 }
export { T_AggregatePaginateResult as T_AggregatePaginateResult_alias_3 }

declare type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;
export { T_Children }
export { T_Children as T_Children_alias_1 }
export { T_Children as T_Children_alias_2 }

declare type T_Children_2 = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;

declare type T_Command = string | I_Command | T_CommandFunction;
export { T_Command }
export { T_Command as T_Command_alias_1 }
export { T_Command as T_Command_alias_2 }
export { T_Command as T_Command_alias_3 }

declare type T_CommandFunction = (context?: I_CommandContext) => string;
export { T_CommandFunction }
export { T_CommandFunction as T_CommandFunction_alias_1 }
export { T_CommandFunction as T_CommandFunction_alias_2 }
export { T_CommandFunction as T_CommandFunction_alias_3 }

declare type T_CommandMap = Record<string, T_Command>;
export { T_CommandMap }
export { T_CommandMap as T_CommandMap_alias_1 }
export { T_CommandMap as T_CommandMap_alias_2 }
export { T_CommandMap as T_CommandMap_alias_3 }

declare type T_CommandMapInput = T_CommandMap | ((ctx: I_CommandContext) => T_CommandMap);
export { T_CommandMapInput }
export { T_CommandMapInput as T_CommandMapInput_alias_1 }
export { T_CommandMapInput as T_CommandMapInput_alias_2 }
export { T_CommandMapInput as T_CommandMapInput_alias_3 }

declare type T_ConfigHandler = (...configs: T_Object_2[]) => T_Object_2;
export { T_ConfigHandler }
export { T_ConfigHandler as T_ConfigHandler_alias_1 }
export { T_ConfigHandler as T_ConfigHandler_alias_2 }

declare type T_ConfigType = `${E_ConfigType}`;
export { T_ConfigType }
export { T_ConfigType as T_ConfigType_alias_1 }
export { T_ConfigType as T_ConfigType_alias_2 }

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
export { T_CreateSlugQueryResponse as T_CreateSlugQueryResponse_alias_3 }

declare type T_DeleteResult = DeleteResult;
export { T_DeleteResult }
export { T_DeleteResult as T_DeleteResult_alias_1 }
export { T_DeleteResult as T_DeleteResult_alias_2 }
export { T_DeleteResult as T_DeleteResult_alias_3 }

declare type T_ErrorHandlingMiddlewareFunction<T> = ErrorHandlingMiddlewareFunction<T>;
export { T_ErrorHandlingMiddlewareFunction }
export { T_ErrorHandlingMiddlewareFunction as T_ErrorHandlingMiddlewareFunction_alias_1 }
export { T_ErrorHandlingMiddlewareFunction as T_ErrorHandlingMiddlewareFunction_alias_2 }
export { T_ErrorHandlingMiddlewareFunction as T_ErrorHandlingMiddlewareFunction_alias_3 }

declare type T_ErrorHandlingMiddlewareWithOption<T> = ErrorHandlingMiddlewareWithOption<T>;
export { T_ErrorHandlingMiddlewareWithOption }
export { T_ErrorHandlingMiddlewareWithOption as T_ErrorHandlingMiddlewareWithOption_alias_1 }
export { T_ErrorHandlingMiddlewareWithOption as T_ErrorHandlingMiddlewareWithOption_alias_2 }
export { T_ErrorHandlingMiddlewareWithOption as T_ErrorHandlingMiddlewareWithOption_alias_3 }

declare type T_Filter<T> = Filter<T>;
export { T_Filter }
export { T_Filter as T_Filter_alias_1 }
export { T_Filter as T_Filter_alias_2 }
export { T_Filter as T_Filter_alias_3 }

declare type T_FilterQuery<T> = FilterQuery<T>;
export { T_FilterQuery }
export { T_FilterQuery as T_FilterQuery_alias_1 }
export { T_FilterQuery as T_FilterQuery_alias_2 }
export { T_FilterQuery as T_FilterQuery_alias_3 }

declare type T_Input_MongooseSchema<T> = SchemaDefinition<T>;
export { T_Input_MongooseSchema }
export { T_Input_MongooseSchema as T_Input_MongooseSchema_alias_1 }
export { T_Input_MongooseSchema as T_Input_MongooseSchema_alias_2 }
export { T_Input_MongooseSchema as T_Input_MongooseSchema_alias_3 }

declare type T_Input_Populate = string | string[] | T_PopulateOptions | T_PopulateOptions[];
export { T_Input_Populate }
export { T_Input_Populate as T_Input_Populate_alias_1 }
export { T_Input_Populate as T_Input_Populate_alias_2 }
export { T_Input_Populate as T_Input_Populate_alias_3 }

declare type T_InsertManyOptions = InsertManyOptions;
export { T_InsertManyOptions }
export { T_InsertManyOptions as T_InsertManyOptions_alias_1 }
export { T_InsertManyOptions as T_InsertManyOptions_alias_2 }
export { T_InsertManyOptions as T_InsertManyOptions_alias_3 }

declare type T_InsertManyResult<T> = InsertManyResult<T>;
export { T_InsertManyResult }
export { T_InsertManyResult as T_InsertManyResult_alias_1 }
export { T_InsertManyResult as T_InsertManyResult_alias_2 }
export { T_InsertManyResult as T_InsertManyResult_alias_3 }

declare type T_InsertOneResult<T> = InsertOneResult<T>;
export { T_InsertOneResult }
export { T_InsertOneResult as T_InsertOneResult_alias_1 }
export { T_InsertOneResult as T_InsertOneResult_alias_2 }
export { T_InsertOneResult as T_InsertOneResult_alias_3 }

declare type T_MongooseHookNextFunction = (error?: Error) => void;
export { T_MongooseHookNextFunction }
export { T_MongooseHookNextFunction as T_MongooseHookNextFunction_alias_1 }
export { T_MongooseHookNextFunction as T_MongooseHookNextFunction_alias_2 }
export { T_MongooseHookNextFunction as T_MongooseHookNextFunction_alias_3 }

declare type T_MongooseMiddlewareMethod = string | RegExp;
export { T_MongooseMiddlewareMethod }
export { T_MongooseMiddlewareMethod as T_MongooseMiddlewareMethod_alias_1 }
export { T_MongooseMiddlewareMethod as T_MongooseMiddlewareMethod_alias_2 }
export { T_MongooseMiddlewareMethod as T_MongooseMiddlewareMethod_alias_3 }

declare type T_MongooseMiddlewarePostFunction<T> = T_PostMiddlewareFunction<T> & T_ErrorHandlingMiddlewareFunction<T> & T_ErrorHandlingMiddlewareWithOption<T>;
export { T_MongooseMiddlewarePostFunction }
export { T_MongooseMiddlewarePostFunction as T_MongooseMiddlewarePostFunction_alias_1 }
export { T_MongooseMiddlewarePostFunction as T_MongooseMiddlewarePostFunction_alias_2 }
export { T_MongooseMiddlewarePostFunction as T_MongooseMiddlewarePostFunction_alias_3 }

declare type T_MongooseMiddlewarePreFunction<T> = T_PreMiddlewareFunction<T> & T_PreSaveMiddlewareFunction<T>;
export { T_MongooseMiddlewarePreFunction }
export { T_MongooseMiddlewarePreFunction as T_MongooseMiddlewarePreFunction_alias_1 }
export { T_MongooseMiddlewarePreFunction as T_MongooseMiddlewarePreFunction_alias_2 }
export { T_MongooseMiddlewarePreFunction as T_MongooseMiddlewarePreFunction_alias_3 }

declare type T_MongoosePlugin = (schema: Schema, options?: Record<string, unknown>) => void;
export { T_MongoosePlugin }
export { T_MongoosePlugin as T_MongoosePlugin_alias_1 }
export { T_MongoosePlugin as T_MongoosePlugin_alias_2 }
export { T_MongoosePlugin as T_MongoosePlugin_alias_3 }

declare type T_MongooseShema<T> = mongoose.Schema<T>;
export { T_MongooseShema }
export { T_MongooseShema as T_MongooseShema_alias_1 }
export { T_MongooseShema as T_MongooseShema_alias_2 }
export { T_MongooseShema as T_MongooseShema_alias_3 }

declare type T_NextIntlMessageList = Record<string, AbstractIntlMessages>;
export { T_NextIntlMessageList }
export { T_NextIntlMessageList as T_NextIntlMessageList_alias_1 }
export { T_NextIntlMessageList as T_NextIntlMessageList_alias_2 }
export { T_NextIntlMessageList as T_NextIntlMessageList_alias_3 }

declare type T_Object = Record<string, any>;
export { T_Object }
export { T_Object as T_Object_alias_1 }
export { T_Object as T_Object_alias_2 }

declare type T_Object_2 = Record<string, any>;

declare type T_OptionalUnlessRequiredId<T> = OptionalUnlessRequiredId<T>;
export { T_OptionalUnlessRequiredId }
export { T_OptionalUnlessRequiredId as T_OptionalUnlessRequiredId_alias_1 }
export { T_OptionalUnlessRequiredId as T_OptionalUnlessRequiredId_alias_2 }
export { T_OptionalUnlessRequiredId as T_OptionalUnlessRequiredId_alias_3 }

declare interface T_PackageJson {
    name?: string;
    version?: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    [key: string]: any;
}
export { T_PackageJson }
export { T_PackageJson as T_PackageJson_alias_1 }
export { T_PackageJson as T_PackageJson_alias_2 }
export { T_PackageJson as T_PackageJson_alias_3 }

declare type T_PaginateOptions = PaginateOptions;
export { T_PaginateOptions }
export { T_PaginateOptions as T_PaginateOptions_alias_1 }
export { T_PaginateOptions as T_PaginateOptions_alias_2 }
export { T_PaginateOptions as T_PaginateOptions_alias_3 }

declare interface T_PaginateOptionsWithPopulate extends T_PaginateOptions, Omit<T_PopulateOption, 'populate'> {
    populate?: T_Input_Populate;
}
export { T_PaginateOptionsWithPopulate }
export { T_PaginateOptionsWithPopulate as T_PaginateOptionsWithPopulate_alias_1 }
export { T_PaginateOptionsWithPopulate as T_PaginateOptionsWithPopulate_alias_2 }
export { T_PaginateOptionsWithPopulate as T_PaginateOptionsWithPopulate_alias_3 }

declare type T_PaginateResult<T> = PaginateResult<T>;
export { T_PaginateResult }
export { T_PaginateResult as T_PaginateResult_alias_1 }
export { T_PaginateResult as T_PaginateResult_alias_2 }
export { T_PaginateResult as T_PaginateResult_alias_3 }

declare type T_PipelineStage = PipelineStage;
export { T_PipelineStage }
export { T_PipelineStage as T_PipelineStage_alias_1 }
export { T_PipelineStage as T_PipelineStage_alias_2 }
export { T_PipelineStage as T_PipelineStage_alias_3 }

declare type T_PopulateOption = PopulateOption;
export { T_PopulateOption }
export { T_PopulateOption as T_PopulateOption_alias_1 }
export { T_PopulateOption as T_PopulateOption_alias_2 }
export { T_PopulateOption as T_PopulateOption_alias_3 }

declare type T_PopulateOptions = PopulateOptions;
export { T_PopulateOptions }
export { T_PopulateOptions as T_PopulateOptions_alias_1 }
export { T_PopulateOptions as T_PopulateOptions_alias_2 }
export { T_PopulateOptions as T_PopulateOptions_alias_3 }

declare type T_PostMiddlewareFunction<T> = PostMiddlewareFunction<T>;
export { T_PostMiddlewareFunction }
export { T_PostMiddlewareFunction as T_PostMiddlewareFunction_alias_1 }
export { T_PostMiddlewareFunction as T_PostMiddlewareFunction_alias_2 }
export { T_PostMiddlewareFunction as T_PostMiddlewareFunction_alias_3 }

declare type T_PreMiddlewareFunction<T> = PreMiddlewareFunction<T>;
export { T_PreMiddlewareFunction }
export { T_PreMiddlewareFunction as T_PreMiddlewareFunction_alias_1 }
export { T_PreMiddlewareFunction as T_PreMiddlewareFunction_alias_2 }
export { T_PreMiddlewareFunction as T_PreMiddlewareFunction_alias_3 }

declare type T_PreSaveMiddlewareFunction<T> = PreSaveMiddlewareFunction<T>;
export { T_PreSaveMiddlewareFunction }
export { T_PreSaveMiddlewareFunction as T_PreSaveMiddlewareFunction_alias_1 }
export { T_PreSaveMiddlewareFunction as T_PreSaveMiddlewareFunction_alias_2 }
export { T_PreSaveMiddlewareFunction as T_PreSaveMiddlewareFunction_alias_3 }

declare type T_ProjectionType<T> = ProjectionType<T>;
export { T_ProjectionType }
export { T_ProjectionType as T_ProjectionType_alias_1 }
export { T_ProjectionType as T_ProjectionType_alias_2 }
export { T_ProjectionType as T_ProjectionType_alias_3 }

declare type T_QueryOptions<T> = QueryOptions<T>;
export { T_QueryOptions }
export { T_QueryOptions as T_QueryOptions_alias_1 }
export { T_QueryOptions as T_QueryOptions_alias_2 }
export { T_QueryOptions as T_QueryOptions_alias_3 }

declare type T_QueryWithHelpers<T> = QueryWithHelpers<T, T>;
export { T_QueryWithHelpers }
export { T_QueryWithHelpers as T_QueryWithHelpers_alias_1 }
export { T_QueryWithHelpers as T_QueryWithHelpers_alias_2 }
export { T_QueryWithHelpers as T_QueryWithHelpers_alias_3 }

declare interface T_ThrowError {
    message?: string;
    status?: {
        CODE: string | number;
        MESSAGE: string;
    };
    type?: 'graphql' | 'rest';
}
export { T_ThrowError }
export { T_ThrowError as T_ThrowError_alias_1 }
export { T_ThrowError as T_ThrowError_alias_2 }
export { T_ThrowError as T_ThrowError_alias_3 }

declare type T_UpdateQuery<T> = UpdateQuery<T>;
export { T_UpdateQuery }
export { T_UpdateQuery as T_UpdateQuery_alias_1 }
export { T_UpdateQuery as T_UpdateQuery_alias_2 }
export { T_UpdateQuery as T_UpdateQuery_alias_3 }

declare type T_UpdateResult = UpdateResult;
export { T_UpdateResult }
export { T_UpdateResult as T_UpdateResult_alias_1 }
export { T_UpdateResult as T_UpdateResult_alias_2 }
export { T_UpdateResult as T_UpdateResult_alias_3 }

declare type T_WithId<T> = WithId<T>;
export { T_WithId }
export { T_WithId as T_WithId_alias_1 }
export { T_WithId as T_WithId_alias_2 }
export { T_WithId as T_WithId_alias_3 }

declare function throwError({ message, status, type, }: T_ThrowError): never;
export { throwError }
export { throwError as throwError_alias_1 }
export { throwError as throwError_alias_2 }
export { throwError as throwError_alias_3 }

export { toast }
export { toast as toast_alias_1 }
export { toast as toast_alias_2 }

export { Toaster }
export { Toaster as Toaster_alias_1 }
export { Toaster as Toaster_alias_2 }

declare const TSC_CLI = "tsc";
export { TSC_CLI }
export { TSC_CLI as TSC_CLI_alias_1 }
export { TSC_CLI as TSC_CLI_alias_2 }
export { TSC_CLI as TSC_CLI_alias_3 }

declare const TSC_PACKAGE_NAME = "typescript";
export { TSC_PACKAGE_NAME }
export { TSC_PACKAGE_NAME as TSC_PACKAGE_NAME_alias_1 }
export { TSC_PACKAGE_NAME as TSC_PACKAGE_NAME_alias_2 }
export { TSC_PACKAGE_NAME as TSC_PACKAGE_NAME_alias_3 }

declare const TSCONFIG_JSON = "tsconfig.json";
export { TSCONFIG_JSON }
export { TSCONFIG_JSON as TSCONFIG_JSON_alias_1 }
export { TSCONFIG_JSON as TSCONFIG_JSON_alias_2 }
export { TSCONFIG_JSON as TSCONFIG_JSON_alias_3 }

declare const TSX_CLI = "tsx";
export { TSX_CLI }
export { TSX_CLI as TSX_CLI_alias_1 }
export { TSX_CLI as TSX_CLI_alias_2 }
export { TSX_CLI as TSX_CLI_alias_3 }

declare function useApolloError(): I_ApolloErrorContext_2;
export { useApolloError }
export { useApolloError as useApolloError_alias_1 }
export { useApolloError as useApolloError_alias_2 }
export { useApolloError as useApolloError_alias_3 }

declare function useLoading(): I_LoadingContext_2;
export { useLoading }
export { useLoading as useLoading_alias_1 }
export { useLoading as useLoading_alias_2 }
export { useLoading as useLoading_alias_3 }

declare function useNextIntl(): I_NextIntlContext;
export { useNextIntl }
export { useNextIntl as useNextIntl_alias_1 }
export { useNextIntl as useNextIntl_alias_2 }
export { useNextIntl as useNextIntl_alias_3 }

declare function useStorage<T>(key: string, initialValue?: T, serializer?: I_Serializer_2<T>): {
    value: T | undefined;
    set: (newValue: T | ((val: T | undefined) => T)) => void;
    remove: () => Promise<void>;
};
export { useStorage }
export { useStorage as useStorage_alias_1 }
export { useStorage as useStorage_alias_2 }
export { useStorage as useStorage_alias_3 }

declare const useTranslateI18next: typeof useTranslation;
export { useTranslateI18next }
export { useTranslateI18next as useTranslateI18next_alias_1 }
export { useTranslateI18next as useTranslateI18next_alias_2 }
export { useTranslateI18next as useTranslateI18next_alias_3 }

declare const useTranslateNextIntl: typeof useTranslations;
export { useTranslateNextIntl }
export { useTranslateNextIntl as useTranslateNextIntl_alias_1 }
export { useTranslateNextIntl as useTranslateNextIntl_alias_2 }
export { useTranslateNextIntl as useTranslateNextIntl_alias_3 }

declare const validate: {
    isEmpty(value: unknown): boolean;
};
export { validate }
export { validate as validate_alias_1 }
export { validate as validate_alias_2 }
export { validate as validate_alias_3 }

declare const VITEST_CLI = "vitest";
export { VITEST_CLI }
export { VITEST_CLI as VITEST_CLI_alias_1 }
export { VITEST_CLI as VITEST_CLI_alias_2 }
export { VITEST_CLI as VITEST_CLI_alias_3 }

declare const VITEST_PACKAGE_NAME = "vitest";
export { VITEST_PACKAGE_NAME }
export { VITEST_PACKAGE_NAME as VITEST_PACKAGE_NAME_alias_1 }
export { VITEST_PACKAGE_NAME as VITEST_PACKAGE_NAME_alias_2 }
export { VITEST_PACKAGE_NAME as VITEST_PACKAGE_NAME_alias_3 }

declare function vitestE2E(options: UserConfig): UserConfig;
export { vitestE2E }
export { vitestE2E as vitestE2E_alias_1 }
export { vitestE2E as vitestE2E_alias_2 }
export { vitestE2E as vitestE2E_alias_3 }

declare function vitestUnit(options: UserConfig): UserConfig;
export { vitestUnit }
export { vitestUnit as vitestUnit_alias_1 }
export { vitestUnit as vitestUnit_alias_2 }
export { vitestUnit as vitestUnit_alias_3 }

declare function withNextIntl<T extends I_Children_2>(Component: ComponentType<T>): {
    (props: T & {
        languages: I_NextIntlLanguage[];
        messages: T_NextIntlMessageList;
    }): JSX_2.Element | null;
    displayName: string;
};
export { withNextIntl }
export { withNextIntl as withNextIntl_alias_1 }
export { withNextIntl as withNextIntl_alias_2 }
export { withNextIntl as withNextIntl_alias_3 }

declare const WORKING_DIRECTORY: string;
export { WORKING_DIRECTORY }
export { WORKING_DIRECTORY as WORKING_DIRECTORY_alias_1 }
export { WORKING_DIRECTORY as WORKING_DIRECTORY_alias_2 }
export { WORKING_DIRECTORY as WORKING_DIRECTORY_alias_3 }

declare function writeFileSync(filePath: string, data: string | T_Object_2, options?: {
    isJson?: boolean;
}): void;
export { writeFileSync }
export { writeFileSync as writeFileSync_alias_1 }
export { writeFileSync as writeFileSync_alias_2 }
export { writeFileSync as writeFileSync_alias_3 }

export { }
