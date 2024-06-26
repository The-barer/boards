declare const _brand: unique symbol

declare global {
    /**
     * Custom utility types
     */
    export type Nullable<T> = T | null

    export type Keys<T extends Record<string, unknown>> = keyof T

    export type Values<T extends Record<string, unknown>> = T[Keys<T>]

    export type Indexed<K = string, T = unknown> = { [key: K]: T }

    export type Brand<K, T> = K & { [_brand]: T }

    /**
     * Type aliases
     */
    export type Phone = string

    export type Email = string

    export type Id = number

    export type DateIso = string

    export type Timestamp = number

    export type Penny = number

    export type Url = string

    export type Color = string

    /**
     * Shared kernel
     */

    /**
     * ⚠️ FSD
     *
     * Its hack way to export redux infering types from @/app
     * and use it in @/shared/model/hooks.ts
     */
    declare module '*.module.css' {
        const classes: { [key: string]: string }
        export default classes
    }

    declare module '*.module.scss' {
        const classes: { [key: string]: string }
        export default classes
    }

    declare module '*.module.sass' {
        const classes: { [key: string]: string }
        export default classes
    }

    declare module '*.module.less' {
        const classes: { [key: string]: string }
        export default classes
    }

    declare module '*.module.styl' {
        const classes: { [key: string]: string }
        export default classes
    }

    declare type RootState = import('../src/App/appStore').RootState

    declare type AppDispatch = import('../src/App/appStore').AppDispatch
}

export {}
