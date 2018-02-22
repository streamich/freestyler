import {TCssTemplate, TComponentTag, TComponentType, TCssTemplateCallback} from '../types/index';
import wrap from './wrap';

const hoc = (staticTemplate?, dynamicTemplate?) => type => wrap(type, staticTemplate, dynamicTemplate);

export default hoc;
