{
  echo "["
  git log --format='{"id":"%H", "tree":"%T", "refs":"'%D'", "parents": ["%P"]}' --all --reflog |
    sed -E 's/"([0-9a-f]+) ([0-9a-f]+)"/"\1", "\2"/g' |
    awk '{printf "%s", (NR>1?",\n":"") $0} END {print ""}'
  echo "]"
}
