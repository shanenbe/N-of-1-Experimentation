import { random_array_element, random_integer_up_to_excluding, random_lower_case_letter_except } from "../Experimentation/Experimentation";
import { integer_partitions_of_fix_length, integer_partitions_of_fix_length_with_constraint } from "../numeric/integer_partition";
import { all_array_combinations } from "../utils/arrays/all_array_combinations";
export class Words {
    pull_random_word() {
        let ret = this.words.splice(random_integer_up_to_excluding(this.words.length), 1)[0];
        return ret;
    }
    pull_n_random_words(number_of_words) {
        return this.pull_n_random_formatted_words(number_of_words, (a) => a);
    }
    pull_n_random_formatted_words(number_of_words, formatter) {
        let ret = [];
        for (let c = 0; c < number_of_words; c++) {
            ret.push(formatter(this.pull_random_word()));
        }
        return ret;
    }
    max_word_length() {
        return Math.max.apply(null, this.words.map(e => e.length));
    }
    min_word_length() {
        return Math.min.apply(null, this.words.map(e => e.length));
    }
    generate_composite_identifier_of_length(length) {
        if (length <= 5) {
            let ret = random_array_element(this.words.filter(e => e.length == length));
            return ret;
        }
        let random_composition = Math.floor(length / 2);
        let first_part = this.generate_composite_identifier_of_length(random_composition);
        let second_part = this.generate_composite_identifier_of_length(length - random_composition);
        return first_part + second_part;
    }
    get_random_word_of_length(length) {
        let w = this.words.filter(e => e.length == length);
        let ret = random_array_element(w);
        if (ret == undefined)
            throw "shit";
        return ret;
    }
    get_random_word_list(list_length, line_length) {
        let min_word_length = this.min_word_length();
        let max_word_length = this.max_word_length();
        let ret = [];
        let all_partitions = integer_partitions_of_fix_length_with_constraint(line_length, list_length, (length) => length >= min_word_length && length <= max_word_length);
        let random_partition = random_array_element(all_partitions);
        for (let number of random_partition) {
            ret.push(this.get_random_word_of_length(number));
        }
        return ret;
    }
    replace_letters_starting_at(word, num_letters_to_replace, first_change_position) {
        let start_word = word.slice(0, first_change_position);
        start_word = start_word + random_lower_case_letter_except([word[first_change_position]]);
        let rest_word = word.slice(first_change_position + 1, word.length);
        let rest_words = this.replace_letters(rest_word, num_letters_to_replace - 1);
        let ret = rest_words.map(w => start_word + w);
        return ret;
    }
    replace_letters(word, num_letters) {
        if (num_letters == 0) {
            if (word == "")
                return [];
            return [word];
        }
        if (word.length == 1) {
            if (num_letters == 1)
                return [random_lower_case_letter_except([word[0]])];
        }
        if (num_letters > word.length) {
            return [];
        }
        let ret = [];
        let partitions = integer_partitions_of_fix_length(num_letters, 2);
        //.filter(e => e[0] != 0 && e[1]!=0)
        for (let partition of partitions) {
            for (let pos = 1; pos < word.length; pos++) {
                // if(partition[0] <= pos && partition[1]  <= word.length - (pos  + 1)) {
                let this_word = word;
                let this_pos = pos;
                let start_word = word.slice(0, pos);
                let start = this.replace_letters(start_word, partition[0]);
                let end_word = word.slice(pos);
                let end = this.replace_letters(end_word, partition[1]);
                all_array_combinations([start, end], (combination) => {
                    ret.push(combination[0] + combination[1]);
                });
                // }
            }
        }
        return ret;
    }
}
Words.capitalizeFirstLetter_formatter = (aString) => {
    return String(aString).charAt(0).toUpperCase() + String(aString).slice(1);
};
Words.lowerCaseFirstLetter_formatter = (aString) => {
    return String(aString).charAt(0).toLowerCase() + String(aString).slice(1);
};
