import { random_array_element, random_integer_up_to_excluding, random_lower_case_letter_except } from "../Experimentation/Experimentation";
import { integer_partitions_of_fix_length, integer_partitions_of_fix_length_with_constraint } from "../numeric/integer_partition";
import { all_array_combinations } from "../utils/arrays/all_array_combinations";
var Words = /** @class */ (function () {
    function Words() {
    }
    Words.prototype.pull_random_word = function () {
        var ret = this.words.splice(random_integer_up_to_excluding(this.words.length), 1)[0];
        return ret;
    };
    Words.prototype.pull_n_random_words = function (number_of_words) {
        return this.pull_n_random_formatted_words(number_of_words, function (a) { return a; });
    };
    Words.prototype.pull_n_random_formatted_words = function (number_of_words, formatter) {
        var ret = [];
        for (var c = 0; c < number_of_words; c++) {
            ret.push(formatter(this.pull_random_word()));
        }
        return ret;
    };
    Words.prototype.max_word_length = function () {
        return Math.max.apply(null, this.words.map(function (e) { return e.length; }));
    };
    Words.prototype.min_word_length = function () {
        return Math.min.apply(null, this.words.map(function (e) { return e.length; }));
    };
    Words.prototype.generate_composite_identifier_of_length = function (length) {
        if (length <= 5) {
            var ret = random_array_element(this.words.filter(function (e) { return e.length == length; }));
            return ret;
        }
        var random_composition = Math.floor(length / 2);
        var first_part = this.generate_composite_identifier_of_length(random_composition);
        var second_part = this.generate_composite_identifier_of_length(length - random_composition);
        return first_part + second_part;
    };
    Words.prototype.get_random_word_of_length = function (length) {
        var w = this.words.filter(function (e) { return e.length == length; });
        var ret = random_array_element(w);
        if (ret == undefined)
            throw "shit";
        return ret;
    };
    Words.prototype.get_random_word_list = function (list_length, line_length) {
        var min_word_length = this.min_word_length();
        var max_word_length = this.max_word_length();
        var ret = [];
        var all_partitions = integer_partitions_of_fix_length_with_constraint(line_length, list_length, function (length) { return length >= min_word_length && length <= max_word_length; });
        var random_partition = random_array_element(all_partitions);
        for (var _i = 0, random_partition_1 = random_partition; _i < random_partition_1.length; _i++) {
            var number = random_partition_1[_i];
            ret.push(this.get_random_word_of_length(number));
        }
        return ret;
    };
    Words.prototype.replace_letters_starting_at = function (word, num_letters_to_replace, first_change_position) {
        var start_word = word.slice(0, first_change_position);
        start_word = start_word + random_lower_case_letter_except([word[first_change_position]]);
        var rest_word = word.slice(first_change_position + 1, word.length);
        var rest_words = this.replace_letters(rest_word, num_letters_to_replace - 1);
        var ret = rest_words.map(function (w) { return start_word + w; });
        return ret;
    };
    Words.prototype.replace_letters = function (word, num_letters) {
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
        var ret = [];
        var partitions = integer_partitions_of_fix_length(num_letters, 2);
        //.filter(e => e[0] != 0 && e[1]!=0)
        for (var _i = 0, partitions_1 = partitions; _i < partitions_1.length; _i++) {
            var partition = partitions_1[_i];
            for (var pos = 1; pos < word.length; pos++) {
                // if(partition[0] <= pos && partition[1]  <= word.length - (pos  + 1)) {
                var this_word = word;
                var this_pos = pos;
                var start_word = word.slice(0, pos);
                var start = this.replace_letters(start_word, partition[0]);
                var end_word = word.slice(pos);
                var end = this.replace_letters(end_word, partition[1]);
                all_array_combinations([start, end], function (combination) {
                    ret.push(combination[0] + combination[1]);
                });
                // }
            }
        }
        return ret;
    };
    Words.capitalizeFirstLetter_formatter = function (aString) {
        return String(aString).charAt(0).toUpperCase() + String(aString).slice(1);
    };
    Words.lowerCaseFirstLetter_formatter = function (aString) {
        return String(aString).charAt(0).toLowerCase() + String(aString).slice(1);
    };
    return Words;
}());
export { Words };
