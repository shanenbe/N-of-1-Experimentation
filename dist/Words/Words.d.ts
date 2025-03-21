export declare abstract class Words {
    words: string[];
    pull_random_word(): string;
    pull_n_random_words(number_of_words: number): string[];
    pull_n_random_formatted_words(number_of_words: number, formatter: ((string: any) => string)): string[];
    max_word_length(): any;
    min_word_length(): any;
    static capitalizeFirstLetter_formatter: (aString: string) => string;
    static lowerCaseFirstLetter_formatter: (aString: string) => string;
    generate_composite_identifier_of_length(length: number): any;
    get_random_word_of_length(length: number): string;
    get_random_word_list(list_length: any, line_length: number): any[];
    replace_letters_starting_at(word: string, num_letters_to_replace: any, first_change_position: number): string[];
    replace_letters(word: string, num_letters: any): string[];
}
