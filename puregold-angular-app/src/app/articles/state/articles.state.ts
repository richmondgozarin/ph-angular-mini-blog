import { State, Action, Selector, StateContext } from "@ngxs/store";

export class AddArticle {
    static type = 'AddArticle';
    constructor(public readonly payload: string){}
}

export class RemoveArticle {
    static type = 'RemoveArticle';
    constructor(public readonly payload: number){}
}

export class ArticleStateModel {
    article: object[];
}

@State<object[]>({
    name: 'article',
    defaults: []
})
export class ArticleState {
    @Selector()
    static pandas(state: object[]) {
        return state.filter(s => s );
    }
}
