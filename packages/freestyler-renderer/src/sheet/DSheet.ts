import {TDeclarations} from '../ast/toStylesheet';
import {Rule, Sheet} from './sheet';

class DRule extends Rule {
    decl: TDeclarations = null;

    put(declarations: TDeclarations) {
        super.put(declarations);
        this.decl = declarations;
    }
}

// Dynamic sheet.
class DSheet extends Sheet<DRule> {
    Rule = DRule;
}

export default DSheet;
