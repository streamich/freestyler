import {TCssTemplate, TComponentTag, TComponentType, TCssTemplateCallback} from '../types/index';
import wrap from './wrap';

const styled = type => (staticTemplate?, dynamicTemplate?) => wrap(type, staticTemplate, dynamicTemplate);

export default styled;
