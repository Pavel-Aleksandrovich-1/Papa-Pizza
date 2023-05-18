import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { Skeleton, PizzaBlock, Sort, Pagination, Categories } from '../components';

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} image={obj.imageUrl} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? 'category=${categoryId}' : '';
    const search = searchValue ? `&search=${searchValue}` : ' ';
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    // fetch(`https://6427dbb846fd35eb7c46d36b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then((res) =>
    //      res.json()
    //   )
    //   .then((arr) => {
    //     setItems(arr);
    // 		setIsLoading(false);
    //   });
    // axios.get(
    // 	`https://6427dbb846fd35eb7c46d36b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    // ).then((res)=>
    // {
    // 	setItems(res.data);
    // 	setIsLoading(false);
    // }
    // );
    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     navigate(`?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sort.sortProperty, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
