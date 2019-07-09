import React, { useState, ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Button, TextField, Chip } from '@material-ui/core';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column"
    },
    textField: {
      width: "100%",
      margin: 0
    },
    chip: {
      margin: theme.spacing(0, 1, 1, 0)
    },
    grow: {
      flexGrow: 1
    },
    searchField: {
      margin: theme.spacing(2, 2, 0)
    },
    form: {
      margin: theme.spacing(2)
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      maxWidth: "100%",
      padding: theme.spacing(0, 2)
    }
  }),
);

interface SearchProps {
  paperClass?: string,
  onSearch?: () => void
}

const handleChange = (setFunc: Function) => (event: ChangeEvent<HTMLInputElement>) => {
  setFunc(event.target.value);
}

const Search: React.FC<SearchProps> = ({ paperClass, onSearch }) => {
  const classes = useStyles();
  const [search, setSearch] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { t } = useTranslation();

  function newTag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tag !== "" && !tags.find((element: string) => {
      return element === tag;
    })) {
      setTags(tags => {
        tags.push(tag);
        return tags;
      })
    }
    setTag("");
  }

  const removeTag = (tag: string) => {
    setTags(tags => tags.filter(t => t !== tag));
  }

  return (
    <Paper className={classes.paper + " " + paperClass}>
      <TextField
        id="search"
        label={t("Search")}
        className={classes.searchField}
        value={search}
        onChange={handleChange(setSearch)}
        margin="normal"
        variant="outlined"
      />
      <form onSubmit={newTag} className={classes.form}>
        <TextField
          id="add-tag"
          label={t("Add Tag")}
          className={classes.textField}
          value={tag}
          onChange={handleChange(setTag)}
          margin="normal"
          variant="outlined"
        />
      </form>
      <div className={classes.tags}>
        {tags.map((tag) => <Chip key={tag} label={tag} onDelete={() => {removeTag(tag)}} className={classes.chip} />)}
      </div>
      {/* <div className={classes.grow}></div> */}
      <Button color="primary" onClick={onSearch}>{t("Search")}</Button>
    </Paper>
  );
};

export default Search;