#!/bin/bash

gitignore_path=".gitignore"
repository_path="$(git rev-parse --show-toplevel)"

# Navegar para o diretório raiz do repositório
cd "$repository_path"

# Ler o arquivo .gitignore linha por linha
while IFS= read -r ignored_file
do
    # Ignorar linhas de comentário começando com '#' ou linhas vazias
    if [[ $ignored_file =~ ^\s*# ]] || [[ -z $ignored_file ]]; then
        continue
    fi

    file_path=$(echo "$ignored_file" | xargs)
    if [[ -n "$file_path" ]]; then
        # Construir o caminho absoluto usando o diretório raiz do repositório
        abs_file_path="$repository_path/${file_path#/}"

        # Executar o comando git -C <REPO_PATH> rm --cached <FILE> para cada arquivo/pasta
        git -C "$repository_path" rm --cached "$abs_file_path"
    fi
done < "$gitignore_path"

echo "Arquivos removidos do cache do Git."